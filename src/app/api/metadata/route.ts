import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { findInfo } from "@/helpers/findInfo";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const workshopIDs = body.mod_list;

  if (!Array.isArray(workshopIDs) || !workshopIDs.length) {
    return NextResponse.json(
      { error: "Invalid workshop IDs provided" },
      { status: 400 },
    );
  }

  const modData = await Promise.all(workshopIDs.map(fetchWorkshopInfo));

  return NextResponse.json(modData);
}

async function fetchWorkshopInfo(id: string) {
  const workshopUrl = `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;

  const response = await axios.get(workshopUrl, {
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
    return {};
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
    rawDescription: rawDescription ? rawDescription : undefined,
    imageURL: image,
    url: workshopUrl,
    ...modInfo,
  };

  return modObject;
}
