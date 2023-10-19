// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("handler(");
    console.log(req.query.grade);

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--window-size=1164,829",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 829,
      height: 1164,
    });
    console.log("829");

    const timeout = 60 * 1000;
    const url: string = "http://localhost:3000/render-pdf/" + req.query.grade;
    const navigationPromise = await page.goto(url, {
      waitUntil: ["networkidle0", "load", "domcontentloaded"],
      timeout: timeout, // Set the navigation timeout
    });

    // Wait for navigation to complete or timeout
    await Promise.race([navigationPromise, page.waitForTimeout(timeout)]);

    const buffer = await page.pdf({
      path: "example.pdf",
      format: "A4",
      printBackground: true,
      margin: { top: 5, right: 0, bottom: 5, left: 0 },
      scale: 1.4,
    });

    await browser.close();
    res.send(buffer);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
