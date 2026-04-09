import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    const { content, scheduledAt, platform } = await req.json();
    const post = await prisma.post.create({
      data: {
        userId: (session.user as any).id,
        content,
        platform,
        scheduledAt: new Date(scheduledAt),
      }
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ error: "Fallo" }, { status: 500 });
  }
}
