import React from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Fade from "react-reveal/Fade";
import { ParallaxProvider } from "react-scroll-parallax";
// import { Parallax } from "react-scroll-parallax";
import Line from "../components/Line";
import HugeText from "../components/HugeText";
import StoneSection from "../components/StoneSection";

export const ChildrenPageTemplate = ({ frontmatter }) => (
  <div>
    <ParallaxProvider>
      <Hero
        image={frontmatter.heroImage}
        content={{
          heading: frontmatter.heading,
          subheading: frontmatter.subheading
        }}
      />
      <section className="relative">
        <div className="home-scroll-line"></div>
        <Line mobile={4} desk={4} />
        <HugeText text="We Honor" start="-10" finish="-60" />
        <Fade>
          <div className="text-center mx-auto max-w-3xl px-8">
            <h4 className="uppercase tracking-widest text-green mb-4 max-w-lg mx-auto">
              {frontmatter.intro.subheading}
            </h4>
            <h2 className="text-3xl lg:text-4xl mb-6">
              {frontmatter.intro.heading}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: frontmatter.intro.description
              }}
            ></div>
          </div>
        </Fade>
        <Line mobile={8} desk={32} />
      </section>
      <div className="container mx-auto bg-tan p-4 flex flex-wrap items-center justify-around">
        {frontmatter.stones.map((section, index) => (
          <a
            key={section.years}
            href={`#section-${index}`}
            className="font-bold w-1/2 md:w-1/4 text-center p-3"
          >
            {section.years}
          </a>
        ))}
      </div>
      {frontmatter.stones.map((section, index) => (
        <StoneSection key={index} section={section} index={index} />
      ))}
    </ParallaxProvider>
    <section id="submitname" style={{ clear: "both" }}>
      <div className="container bg-tan p-8 mt-12 py-24 lg:py-24 mb-12 relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">Submit a Child's Name</h2>
          <p className="mb-4">{frontmatter.submitname}</p>
          <p>
            <a
              href="https://daysof47.formstack.com/forms/pioneer_children_story"
              target="_blank"
              className="font-bold text-green uppercase tracking-wider"
              rel="noopener noreferrer"
            >
              Submit a Name →
            </a>
          </p>
        </div>
      </div>
    </section>
  </div>
);

// ChildrenPageTemplate.propTypes = {
//   heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   title: PropTypes.string,
//   heading: PropTypes.string,
// };

const ChildrenPage = ({ data }) => {
  // console.log(data);
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <ChildrenPageTemplate frontmatter={frontmatter} />
    </Layout>
  );
};

// ChildrenPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object
//     }),
//     introBg: PropTypes.object,
//     donorsBg: PropTypes.object
//   })
// };

export default ChildrenPage;

export const pageQuery = graphql`
  query ChildrenPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "children-page" } }) {
      frontmatter {
        title
        heading
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        intro {
          heading
          subheading
          description
        }
        submitname
        stones {
          heading
          years
          names {
            name
            link
          }
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;

// gallery {
//   image {
//     childImageSharp {
//       fluid(maxWidth: 600, quality: 90) {
//         ...GatsbyImageSharpFluid_withWebp
//       }
//     }
//   }
// }

// export const aboutPageQuery = graphql`
//   query ChildrenPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `
