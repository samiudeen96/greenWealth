"use client";

import axios from "axios";
import { useState } from "react";

export default function VerifyPage() {
  const [secretCode, setSecretCode] = useState("");
  const [email, setEmail] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locStatus, setLocStatus] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus("Geolocation not supported.");
      return;
    }

    setLocStatus("Getting location…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLocStatus("Location captured ✓");
      },
      (err) => {
        setLocStatus("Location error: " + err.message);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    getLocation();

    if(!lat && !lng){

      console.log("location is not detected");

    }

          const data = {
          email,
          latitude: lat,
          longitude: lng,
        };

        console.log("Submitting:", data);


    // Example POST
    
    await fetch(`${process.env.NEXT_PUBLIC_API_SECRET_CODE_URL}${secretCode}`, data, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // await axios.post(`${process.env.NEXT_PUBLIC_API_SECRET_CODE_URL}${secretCode}`, data,)
    
  };

  return (
    <div className=" bg-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-sm p-7 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-zinc-900 text-center">
          Product Verification
        </h1>

        {/* Secret Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter Secret Code</label>
          <input
            type="text"
            required
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Ex: 0000123456789"
            className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500"
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          {/* <button
            type="button"
            onClick={getLocation}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-xl"
          >
            Use My Location
          </button> */}

          {locStatus && (
            <p className="text-xs text-zinc-600">{locStatus}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] uppercase text-zinc-400">Latitude</p>
              <p className="border border-zinc-200 bg-zinc-50 rounded-lg px-3 py-2 text-xs">
                {lat ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase text-zinc-400">Longitude</p>
              <p className="border border-zinc-200 bg-zinc-50 rounded-lg px-3 py-2 text-xs">
                {lng ?? "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white rounded-xl py-3 text-sm font-medium hover:bg-zinc-900"
        >
          Verify Product
        </button>
      </form>
    </div>
  );
}
