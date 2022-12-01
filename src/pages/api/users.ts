import type { APIRoute } from 'astro';
import { getAllUsers } from 'src/lib/users';

export const get: APIRoute = async () => {
  const users = await getAllUsers();

  return new Response(JSON.stringify(users), {
    status: 200,
  });
};
