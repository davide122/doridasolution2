import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db"; // Ensure your database connection path is correct

export async function GET(request, { params }) {
    console.log("Received ID:", params.id); // Log the received ID
    try {
        const queryText = 'SELECT * FROM songs WHERE id = $1;';
        console.log("Querying database with:", queryText, params.id);
        const { rows } = await pool.query(queryText, [params.id]);
        console.log("Database response:", rows);

        if (rows.length === 0) {
            console.log("No song found for ID:", params.id);
            return new NextResponse(JSON.stringify({ message: 'Song not found' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(rows[0]), { status: 200 });
    } catch (error) {
        console.error('Error fetching song:', error);
        return new NextResponse(JSON.stringify({ message: 'Error fetching the song', error: error.message }), { status: 500 });
    }
}
