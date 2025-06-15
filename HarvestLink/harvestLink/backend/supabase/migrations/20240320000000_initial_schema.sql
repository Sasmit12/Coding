-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE user_role AS ENUM ('consumer', 'farmer', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'cash', 'bank_transfer');
CREATE TYPE delivery_method AS ENUM ('pickup', 'delivery');
CREATE TYPE product_category AS ENUM (
    'vegetables',
    'fruits',
    'dairy',
    'meat',
    'eggs',
    'honey',
    'grains',
    'herbs',
    'other'
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'consumer',
    phone TEXT,
    avatar_url TEXT,
    -- Farmer specific fields
    farm_name TEXT,
    farm_description TEXT,
    farm_location GEOGRAPHY(POINT),
    farm_address TEXT,
    farm_phone TEXT,
    farm_website TEXT,
    farm_certifications TEXT[],
    -- Consumer specific fields
    default_delivery_address TEXT,
    default_payment_method payment_method,
    -- Common fields
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    CONSTRAINT valid_farmer_fields CHECK (
        (role = 'farmer' AND farm_name IS NOT NULL AND farm_location IS NOT NULL) OR
        (role = 'consumer' AND farm_name IS NULL AND farm_location IS NULL)
    )
);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    unit TEXT NOT NULL CHECK (unit IN ('kg', 'g', 'lb', 'oz', 'piece', 'dozen', 'bunch')),
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity >= 0),
    category product_category NOT NULL,
    tags TEXT[],
    images TEXT[] NOT NULL,
    availability TEXT NOT NULL DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'low_stock', 'out_of_stock')),
    harvest_date DATE,
    expiry_date DATE,
    nutritional_info JSONB,
    storage_instructions TEXT,
    preparation_instructions TEXT,
    allergens TEXT[],
    certifications TEXT[],
    rating NUMERIC(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_dates CHECK (harvest_date <= expiry_date)
);

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    consumer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    farmer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    status order_status NOT NULL DEFAULT 'pending',
    payment_status payment_status NOT NULL DEFAULT 'pending',
    payment_method payment_method NOT NULL,
    delivery_method delivery_method NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    delivery_address JSONB,
    pickup_location GEOGRAPHY(POINT),
    delivery_instructions TEXT,
    estimated_delivery_date TIMESTAMPTZ,
    actual_delivery_date TIMESTAMPTZ,
    cancellation_reason TEXT,
    refund_amount NUMERIC(10,2) CHECK (refund_amount >= 0),
    tracking_number TEXT,
    tracking_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_delivery_info CHECK (
        (delivery_method = 'delivery' AND delivery_address IS NOT NULL) OR
        (delivery_method = 'pickup' AND pickup_location IS NOT NULL)
    )
);

-- Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    unit TEXT NOT NULL CHECK (unit IN ('kg', 'g', 'lb', 'oz', 'piece', 'dozen', 'bunch')),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    consumer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    images TEXT[],
    ratings JSONB, -- Stores quality, freshness, value ratings
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    helpful_votes INTEGER DEFAULT 0,
    farmer_response TEXT,
    farmer_response_at TIMESTAMPTZ,
    is_verified_purchase BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(product_id, order_id)
);

-- Create helpful_votes table
CREATE TABLE public.helpful_votes (
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (review_id, user_id)
);

-- Create messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT different_sender_receiver CHECK (sender_id != receiver_id)
);

-- Create loyalty_points table
CREATE TABLE public.loyalty_points (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0),
    tier TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create loyalty_transactions table
CREATE TABLE public.loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('earn', 'redeem', 'expire', 'adjust')),
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_products_farmer ON public.products(farmer_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_tags ON public.products USING GIN(tags);
CREATE INDEX idx_products_location ON public.products USING GIST(farm_location);
CREATE INDEX idx_orders_consumer ON public.orders(consumer_id);
CREATE INDEX idx_orders_farmer ON public.orders(farmer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_reviews_product ON public.reviews(product_id);
CREATE INDEX idx_reviews_consumer ON public.reviews(consumer_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_messages_conversation ON public.messages(sender_id, receiver_id, created_at);

-- Create function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || 
        TO_CHAR(NOW(), 'YYMMDD') || '-' ||
        LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for order number generation
CREATE TRIGGER set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION generate_order_number();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'consumer')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create function to update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products
    SET 
        rating = (
            SELECT AVG(rating)::NUMERIC(3,2)
            FROM public.reviews
            WHERE product_id = NEW.product_id
            AND status = 'approved'
        ),
        review_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE product_id = NEW.product_id
            AND status = 'approved'
        )
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for product rating updates
CREATE TRIGGER on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_rating();

-- Create function to update loyalty points
CREATE OR REPLACE FUNCTION update_loyalty_points()
RETURNS TRIGGER AS $$
DECLARE
    points_to_add INTEGER;
    new_tier TEXT;
BEGIN
    -- Calculate points based on order total (1 point per $10)
    points_to_add := FLOOR(NEW.total_amount / 10);
    
    -- Insert transaction record
    INSERT INTO public.loyalty_transactions (
        user_id,
        points,
        type,
        order_id,
        description
    ) VALUES (
        NEW.consumer_id,
        points_to_add,
        'earn',
        NEW.id,
        'Points earned from order ' || NEW.order_number
    );
    
    -- Update user's total points
    UPDATE public.loyalty_points
    SET 
        points = points + points_to_add,
        tier = CASE
            WHEN points + points_to_add >= 1000 THEN 'platinum'
            WHEN points + points_to_add >= 500 THEN 'gold'
            WHEN points + points_to_add >= 100 THEN 'silver'
            ELSE 'bronze'
        END,
        updated_at = NOW()
    WHERE user_id = NEW.consumer_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for loyalty points updates
CREATE TRIGGER on_order_complete
    AFTER UPDATE OF status ON public.orders
    FOR EACH ROW
    WHEN (NEW.status = 'delivered' AND OLD.status != 'delivered')
    EXECUTE FUNCTION update_loyalty_points();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.helpful_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users policies
CREATE POLICY "Users can view their own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Anyone can view active products"
    ON public.products FOR SELECT
    USING (is_active = true);

CREATE POLICY "Farmers can manage their own products"
    ON public.products FOR ALL
    USING (
        auth.uid() = farmer_id AND
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'farmer'
        )
    );

-- Orders policies
CREATE POLICY "Consumers can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = consumer_id);

CREATE POLICY "Farmers can view orders for their products"
    ON public.orders FOR SELECT
    USING (
        auth.uid() = farmer_id AND
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'farmer'
        )
    );

CREATE POLICY "Consumers can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (
        auth.uid() = consumer_id AND
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'consumer'
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews"
    ON public.reviews FOR SELECT
    USING (status = 'approved');

CREATE POLICY "Consumers can create reviews for their orders"
    ON public.reviews FOR INSERT
    WITH CHECK (
        auth.uid() = consumer_id AND
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id AND consumer_id = auth.uid() AND status = 'delivered'
        )
    );

-- Messages policies
CREATE POLICY "Users can view their own messages"
    ON public.messages FOR SELECT
    USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can send messages"
    ON public.messages FOR INSERT
    WITH CHECK (auth.uid() = sender_id);

-- Loyalty policies
CREATE POLICY "Users can view their own loyalty points"
    ON public.loyalty_points FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own loyalty transactions"
    ON public.loyalty_transactions FOR SELECT
    USING (auth.uid() = user_id);

-- Create function to initialize loyalty points for new users
CREATE OR REPLACE FUNCTION initialize_loyalty_points()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.loyalty_points (user_id, points, tier)
    VALUES (NEW.id, 0, 'bronze');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for loyalty points initialization
CREATE TRIGGER on_user_created
    AFTER INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION initialize_loyalty_points(); 