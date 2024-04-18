import { authenticate } from "@/actions";

export const POST = async (req, res) => {
  const body = await req.json();
  const users = await authenticate(null, body);

  if (users) {
    return res.status(200).json(users);
  }
  return res.status(200).json([]);
};
