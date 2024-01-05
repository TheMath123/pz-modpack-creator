import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { findInfo } from "@/helpers/findInfo";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const modId = searchParams.get("mod_id");

  if (typeof modId !== "string") {
    return NextResponse.json(
      { error: "URL must be a string" },
      { status: 400 },
    );
  }

  try {
    const modObject = await fetchWorkshopInfo(modId);

    if (modObject.error) {
      return NextResponse.json({ error: modObject.error }, { status: 404 });
    }

    return NextResponse.json(modObject, { status: 200 });
  } catch (error) {
    console.error("metadata API error:", error);
    return NextResponse.json(
      { error: "Error fetching metadata" },
      { status: 500 },
    );
  }
}

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
    return {
      workshop_id: id,
      error: "Mod not found",
    };
  }

  const modsRequirements: {}[] = [];

  const metaDescription =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content");
  const image = $('meta[property="og:image"]').attr("content");
  const rawDescription = $("#highlightContent").html();
  $(".requiredItemsContainer a").each((index, element) => {
    const url = $(element).attr("href");
    const name = $(element).find(".requiredItem").text().trim();
    const urlParams = new URL(url as string);
    const id = urlParams.searchParams.get("id");

    modsRequirements.push({ name, id, url });
  });
  const modInfo = findInfo(rawDescription);

  const modObject = {
    title: title.replaceAll("Steam Workshop::", ""),
    description: metaDescription,
    rawDescription: rawDescription ? rawDescription : undefined,
    imageURL: image,
    url: workshopUrl,
    modsRequirements: modsRequirements,
    ...modInfo,
    error: null,
  };

  return modObject;
}
