import Layout from '@/components/Layout';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Event.module.css';
import { API_URL } from '@/config/index';
export default function EventsPage({ evt }) {
  const deleteEvent = e => {
    console.log('delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>

        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'< '} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map(evt => ({
    params: { slug: evt.slug }
  }));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log(slug);

  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  console.log(events);

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1
  };
}

// export async function getServerSslugeProps({ query: { slug } }) {
//   console.log(slug);

//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   console.log(events);

//   return {
//     props: {
//       evt: events[0]
//     }
//   };
// }
