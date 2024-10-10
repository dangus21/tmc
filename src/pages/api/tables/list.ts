// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "node:fs";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	files: string[];
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const currentPath = path.resolve("./public/tables");
	const files = fs.readdirSync(currentPath).map((file) => file.split(".")[0]);

	res.status(200).json({ files });
}
