import { redirect } from "next/navigation";

export default function MyResultsRedirectPage() {
  redirect("/teacher/dashboard/results/my-results");
}
