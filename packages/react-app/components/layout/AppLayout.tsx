import * as React from "react";
import Meta from "../meta/Meta";
import { Header } from "./Header";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, description, children }: Props) {
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <Header />
      <Meta title={title} description={description} />
      {children}
    </div>
  );
}
