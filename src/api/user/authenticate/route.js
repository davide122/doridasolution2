import { authenticate } from "@/actions";

export const POST = async (req, res) => {
  const users = await authenticate(null, JSON.parse(req.body));
  if (users) {
    return res.status(200).json(users);
  }
  return res.status(200).json([]);
};
