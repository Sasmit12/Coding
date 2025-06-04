import {
  collections,
  createDocument,
  getDocument,
  queryDocuments,
  createAuditLog,
  updateDocument
} from '../services/db.js';

export const sendMessage = async (req, res) => {
  try {
    const { content, recipientId } = req.body;
    const senderId = req.user.uid;

    // Generate or get thread ID (combination of both user IDs, sorted alphabetically)
    const threadId = [senderId, recipientId].sort().join('_');

    // Create message
    const message = await createDocument(collections.CHATS, {
      threadId,
      content,
      senderId,
      recipientId,
      timestamp: new Date(),
      status: 'sent', // sent, delivered, read
    });

    // Create audit log
    await createAuditLog(
      'message_sent',
      senderId,
      {
        messageId: message.id,
        threadId,
        recipientId
      }
    );

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { threadId } = req.params;
    const userId = req.user.uid;

    // Verify user is part of the thread
    const [user1, user2] = threadId.split('_');
    if (user1 !== userId && user2 !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to chat history' });
    }

    // Query messages
    const messages = await queryDocuments(collections.CHATS, [
      { field: 'threadId', operator: '==', value: threadId }
    ]);

    // Sort messages by timestamp
    messages.sort((a, b) => {
      // Handles Firestore Timestamp or JS Date for robust comparison
      const getTime = (x) =>
        x.timestamp?.toMillis?.() ||
        x.timestamp?.getTime?.() ||
        new Date(x.timestamp).getTime();
      return getTime(a) - getTime(b);
    });

    // Update message status to 'read' for received messages
    const messageUpdates = messages
      .filter(msg => msg.recipientId === userId && msg.status !== 'read')
      .map(msg => updateDocument(collections.CHATS, msg.id, { status: 'read' }));

    await Promise.all(messageUpdates);

    // Create audit log
    await createAuditLog(
      'chat_history_viewed',
      userId,
      { threadId }
    );

    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

export const getUserThreads = async (req, res) => {
  try {
    const userId = req.user.uid;

    // Query messages where user is either sender or recipient
    const sentMessages = await queryDocuments(collections.CHATS, [
      { field: 'senderId', operator: '==', value: userId }
    ]);

    const receivedMessages = await queryDocuments(collections.CHATS, [
      { field: 'recipientId', operator: '==', value: userId }
    ]);

    // Combine and process threads
    const threads = new Map();
    [...sentMessages, ...receivedMessages].forEach(message => {
      if (!threads.has(message.threadId)) {
        threads.set(message.threadId, {
          threadId: message.threadId,
          lastMessage: message,
          participants: message.threadId.split('_'),
          unreadCount: 0
        });
      }

      // Update last message if newer
      const thread = threads.get(message.threadId);
      const getTime = (x) =>
        x.timestamp?.toMillis?.() ||
        x.timestamp?.getTime?.() ||
        new Date(x.timestamp).getTime();
      if (getTime(message) > getTime(thread.lastMessage)) {
        thread.lastMessage = message;
      }

      // Count unread messages
      if (message.recipientId === userId && message.status !== 'read') {
        thread.unreadCount++;
      }
    });

    // Create audit log
    await createAuditLog(
      'threads_listed',
      userId,
      { threadCount: threads.size }
    );

    res.json(Array.from(threads.values()));
  } catch (error) {
    console.error('Error fetching user threads:', error);
    res.status(500).json({ error: 'Failed to fetch user threads' });
  }
};