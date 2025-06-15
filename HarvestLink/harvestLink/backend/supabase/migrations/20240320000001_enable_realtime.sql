-- Enable real-time for the orders table
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Create a function to check if a user can subscribe to order updates
CREATE OR REPLACE FUNCTION can_subscribe_to_orders(user_id UUID, order_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.orders
        WHERE id = order_id
        AND (
            -- User is the consumer of the order
            consumer_id = user_id
            OR
            -- User is the farmer of the order
            farmer_id = user_id
            OR
            -- User is an admin
            EXISTS (
                SELECT 1 FROM public.users
                WHERE id = user_id AND role = 'admin'
            )
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a policy to control real-time access to orders
CREATE POLICY "Users can subscribe to their own orders"
    ON public.orders
    FOR SELECT
    USING (
        auth.uid() = consumer_id
        OR
        auth.uid() = farmer_id
        OR
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create a function to filter order updates based on user role
CREATE OR REPLACE FUNCTION filter_order_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- For consumers, only show status updates and delivery information
    IF EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'consumer'
    ) THEN
        NEW.payment_status := OLD.payment_status;
        NEW.payment_method := OLD.payment_method;
        NEW.total_amount := OLD.total_amount;
    END IF;

    -- For farmers, only show order details and consumer delivery information
    IF EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'farmer'
    ) THEN
        NEW.payment_status := OLD.payment_status;
        NEW.payment_method := OLD.payment_method;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to filter order updates
CREATE TRIGGER filter_order_updates_trigger
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION filter_order_updates(); 