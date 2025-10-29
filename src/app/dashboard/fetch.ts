// Chats data provider removed — chats are no longer shown in the dashboard.
// Keep a tiny compatibility export in case something still imports it.
export async function getChatsData() {
  return [] as const;
}