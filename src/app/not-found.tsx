import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <p className="not-found-code">ERROR / MODEL_NOT_FOUND</p>
        <h1>Lost in the grid.</h1>
        <p>This model does not exist or has moved to a new archive slot.</p>
        <Link className="button button-primary" href="/">
          Return to archive
        </Link>
      </div>
    </main>
  );
}
