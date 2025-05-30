import {
  Search,
  Send,
  Paperclip,
  Loader2,
  FileText,
  ImageIcon,
  VideoIcon,
  MessageSquare,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { cn } from "./lib/utils";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";

export const MessagesTab = () => {
  const { currentUser } = useSelector((state) => state.user);
  const socket = useSocket();

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const isAdvisor = currentUser?.roles === "Advisor";

  const fetchConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/chat/conversations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      setConversations(data);
      if (data.length && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    } catch (err) {
      console.error("Fetch conversations error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, selectedConversation]);

  const fetchMessages = useCallback(async () => {
    if (!selectedConversation) return;
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/chat/messages/${selectedConversation._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Fetch messages error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, selectedConversation]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    fetchMessages();
  }, [selectedConversation, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (msg) => {
      if (msg.conversationId === selectedConversation._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !file) return;
    if (!selectedConversation) return;

    const formData = new FormData();
    formData.append("conversationId", selectedConversation._id);
    formData.append("senderId", currentUser._id);
    if (file) formData.append("file", file);
    if (newMessage.trim()) formData.append("text", newMessage.trim());

    try {
      setIsSending(true);
      const res = await fetch(`${API_URL}/api/chat/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getOtherParticipant = (conversation) =>
    conversation.participants.find((p) => p._id !== currentUser._id);

  const getRoleIcon = (role) =>
    role === "Advisor" ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />;

  const formatFileIcon = (type) => {
    if (!type) return <FileText className="w-5 h-5 mr-1" />;
    if (type.startsWith("image")) return <ImageIcon className="w-5 h-5 mr-1" />;
    if (type.startsWith("video")) return <VideoIcon className="w-5 h-5 mr-1" />;
    return <FileText className="w-5 h-5 mr-1" />;
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white dark:bg-gray-900 rounded-lg shadow border overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={isAdvisor ? "Search students..." : "Search advisors..."}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
          </div>
        ) : (
          <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-180px)] pr-2">
            {conversations.length === 0 ? (
              <div className="text-center text-gray-500">
                <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                <p>No conversations yet</p>
              </div>
            ) : (
              conversations
                .filter((conv) => {
                  const user = getOtherParticipant(conv);
                  return (
                    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                })
                .map((conv) => {
                  const user = getOtherParticipant(conv);
                  return (
                    <li
                      key={conv._id}
                      onClick={() => setSelectedConversation(conv)}
                      className={cn(
                        "p-3 rounded cursor-pointer hover:bg-gray-200 flex items-center",
                        selectedConversation?._id === conv._id && "bg-gray-200 font-semibold"
                      )}
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        {getRoleIcon(user?.roles)}
                      </div>
                      <div className="flex-1">
                        <div className="truncate font-medium">{user?.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                        {conv.lastMessage && (
                          <div className="text-xs text-gray-500 truncate mt-1">
                            {conv.lastMessage.text || "Attachment"}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })
            )}
          </ul>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="border-b p-4 bg-white flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                {getRoleIcon(getOtherParticipant(selectedConversation)?.roles)}
              </div>
              <div>
                <h3 className="font-medium">
                  {getOtherParticipant(selectedConversation)?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {getOtherParticipant(selectedConversation)?.email}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={cn(
                      "mb-3 flex flex-col",
                      msg.senderId === currentUser._id ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs p-3 rounded-lg",
                        msg.senderId === currentUser._id
                          ? "bg-blue-500 text-white"
                          : "bg-white border text-gray-800"
                      )}
                    >
                      {msg.content?.text && (
                        <p className="whitespace-pre-wrap">{msg.content.text}</p>
                      )}
                      {msg.fileUrl && (
                        <a
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center mt-1 underline"
                        >
                          {formatFileIcon(msg.fileType)}
                          <span>Download file</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4 flex items-center gap-2 bg-white">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-blue-500"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleSendMessage}
                disabled={isSending}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            <MessageSquare className="w-8 h-8 mr-2" />
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};
