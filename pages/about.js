export default function About({ content }) {
    return (
      <section className="p-16">
        about page coming soon
      </section>
    )
  }

// export const getStaticProps = async () => {
//     const content = await getContent({
//         content_type: "aboutPageContent",
//     });

//     return {
//         props: { content: content[0].fields },
//         revalidate: 1
//     }
// }