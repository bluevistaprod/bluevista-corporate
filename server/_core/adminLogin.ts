import express from 'express';
import crypto from 'crypto';
import { getDb } from '../db';
import { adminCredentials } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

const COOKIE_NAME = 'bluevista-admin-session';

export async function adminLoginEndpoint(req: express.Request, res: express.Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    // Get admin from database
    const admins = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.username, username))
      .limit(1);

    if (!admins.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Hash password and compare
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    if (admins[0].passwordHash !== passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set secure cookie
    res.cookie(COOKIE_NAME, JSON.stringify({ adminLogin: true, username }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
