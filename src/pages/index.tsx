import React from "react";
import LandingPage from "@/components/LandingPage";
import { useUser } from '@auth0/nextjs-auth0/client';
import Home from "./home";

export default function Index() {
const { user, error, isLoading} = useUser();

  if(!user)
  {
    return (
      <LandingPage/>
    );
  }
  if(user)
  {
    return (
      <Home/>
    );
  }
}