import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { findInfo } from "@/helpers/findInfo";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const itemURL = searchParams.get("url");

  if (typeof itemURL !== "string") {
    return NextResponse.json(
      { error: "URL must be a string" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(itemURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });

    const $ = cheerio.load(response.data);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text().replaceAll("Steam Workshop::", "");

    if (title === "Steam Community :: Error") {
      return NextResponse.json(
        { error: "Mod not found or invalid workshop ID" },
        { status: 404 },
      );
    }

    const metaDescription =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");
    const rawDescription = $("#highlightContent").html();
    const modInfo = findInfo(rawDescription);

    const modObject = {
      title: title.replaceAll("Steam Workshop::", ""),
      description: metaDescription,
      rawDescription: rawDescription,
      imageURL: image,
      url: itemURL,
      ...modInfo,
    };

    return NextResponse.json(modObject, { status: 200 });
  } catch (error) {
    console.error("metadata API error:", error);
    return NextResponse.json(
      { error: "Error fetching metadata" },
      { status: 500 },
    );
  }
}
