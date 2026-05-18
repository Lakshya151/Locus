import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://izilpfyxcqkdmzphuier.supabase.co",
  "sb_publishable_LacAuXpiKut2jUHgZgkJNQ_BAzm9YHc",
);

export async function get_posts_5km(latitude, longitude) {
  const { data, error } = await supabase.rpc("nearby_posts", {
    lat: latitude,
    lng: longitude,
    radius_km: 5,
  });

  if (error) {
    console.error(error);
    return null;
  }
  console.log(data);
  return data;
}

export async function get_posts_10km(latitude, longitude) {
  const { data, error } = await supabase.rpc("nearby_posts", {
    lat: latitude,
    lng: longitude,
    radius_km: 10,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function get_posts_25km(latitude, longitude) {
  const { data, error } = await supabase.rpc("nearby_posts", {
    lat: latitude,
    lng: longitude,
    radius_km: 25,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function get_posts_by_city(city_name) {
  const { data, error } = await supabase.rpc("posts_by_city", {
    city_name: city_name,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function get_posts_by_country(country_name) {
  const { data, error } = await supabase.rpc("posts_by_country", {
    country_name: country_name,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function get_all_posts() {
  const { data, error } = await supabase.rpc("get_all_posts");

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

async function test_functions() {
  // Galgotias University coordinates
  const lat = 28.367;
  const lng = 77.54;

  console.log("===== GALGOTIAS 5KM =====");
  const posts5km = await get_posts_5km(lat, lng);
  console.log(posts5km);

  console.log("===== GALGOTIAS 10KM =====");
  const posts10km = await get_posts_10km(lat, lng);
  console.log(posts10km);

  console.log("===== GALGOTIAS 25KM =====");
  const posts25km = await get_posts_25km(lat, lng);
  console.log(posts25km);

  console.log("===== CITY: GREATER NOIDA =====");
  const cityPosts = await get_posts_by_city("Greater Noida");
  console.log(cityPosts);

  console.log("===== COUNTRY: INDIA =====");
  const countryPosts = await get_posts_by_country("India");
  console.log(countryPosts);

  console.log("===== ALL POSTS =====");
  const allPosts = await get_all_posts();
  console.log(allPosts);
}
