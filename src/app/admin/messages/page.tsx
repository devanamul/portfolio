import prisma from "@/lib/prisma";
import { Mail, Clock } from "lucide-react";

async function getMessages() {
  return prisma.contactMessage.findMany({ orderBy: { id: "desc" } });
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
      <p className="text-gray-500 text-sm mb-8">Contact form submissions ({messages.length})</p>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Mail size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-indigo-600 text-sm hover:underline">{msg.email}</a>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Clock size={12} />
                  {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : "Unknown date"}
                </div>
              </div>
              {msg.subject && <p className="text-gray-600 text-sm font-medium mb-2">{msg.subject}</p>}
              <p className="text-gray-700 text-sm leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
