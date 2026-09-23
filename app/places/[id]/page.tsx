import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import { places } from "@/lib/content";

export function generateStaticParams() {
  return places.map((place) => ({ id: place.id }));
}

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = places.find((item) => item.id === id);
  if (!place) notFound();

  const similar = places.filter((item) => item.id !== place.id && item.category === place.category)
    .concat(places.filter((item) => item.id !== place.id && item.category !== place.category))
    .slice(0, 4);

  return (
    <main className="place-page">
      <section className={"place-detail-hero detail-" + place.id}>
        <div className="place-detail-shade" />
        <nav className="place-detail-nav">
          <Link href="/#discover"><ArrowLeft size={18}/> The Journey</Link>
          <span><BadgeCheck size={16}/> Verified source</span>
        </nav>
        <div className="place-detail-title">
          <span>{place.governorate} · {place.category}</span>
          <h1>{place.name.en}</h1>
          <p>{place.summary.en}</p>
        </div>
      </section>

      <section className="place-story">
        <aside>
          <span>01</span><p>THE STORY</p>
        </aside>
        <div>
          <h2>A place worth slowing down for.</h2>
          <p>{place.summary.en} The Journey keeps the destination inside the experience, while the original heritage source remains available for verification and deeper research.</p>
          <div className="place-facts">
            <div><MapPin size={20}/><span>Region</span><strong>{place.governorate}</strong></div>
            <div><BadgeCheck size={20}/><span>Source status</span><strong>Verified</strong></div>
          </div>
          <a className="source-button" href={place.sourceUrl} target="_blank" rel="noopener noreferrer">
            Source: {place.sourceLabel} <ArrowUpRight size={17}/>
          </a>
        </div>
      </section>

      <section className="similar-section">
        <div className="similar-heading"><span>CONTINUE EXPLORING</span><h2>You may also like</h2></div>
        <div className="similar-rail">
          {similar.map((item, index) => (
            <Link className={"similar-card art-" + item.id} href={"/places/" + item.id} key={item.id}>
              <span>{String(index + 1).padStart(2,"0")} · {item.governorate}</span>
              <div><h3>{item.name.en}</h3><p>{item.category}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
