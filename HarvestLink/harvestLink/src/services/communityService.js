import api from "./api";

export const communityService = {
  // Forum Posts
  getPosts: async (filters = {}) => {
    const response = await api.get("/forum/posts", { params: filters });
    return response.data;
  },

  getPost: async (id) => {
    const response = await api.get(`/forum/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await api.post("/forum/posts", postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/forum/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/forum/posts/${id}`);
    return response.data;
  },

  // Comments
  getComments: async (postId) => {
    const response = await api.get(`/forum/posts/${postId}/comments`);
    return response.data;
  },

  createComment: async (postId, commentData) => {
    const response = await api.post(
      `/forum/posts/${postId}/comments`,
      commentData,
    );
    return response.data;
  },

  // Resources
  getResources: async (category) => {
    const response = await api.get("/resources", { params: { category } });
    return response.data;
  },

  createResource: async (resourceData) => {
    const response = await api.post("/resources", resourceData);
    return response.data;
  },

  // Events
  getEvents: async () => {
    const response = await api.get("/events");
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
  },

  registerForEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  },

  // Ratings and Reviews
  createReview: async (farmerId, reviewData) => {
    const response = await api.post(`/farmers/${farmerId}/reviews`, reviewData);
    return response.data;
  },

  getReviews: async (farmerId) => {
    const response = await api.get(`/farmers/${farmerId}/reviews`);
    return response.data;
  },
};
