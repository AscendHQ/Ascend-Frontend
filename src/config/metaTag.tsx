import Head from "next/head";
import React from "react";

export default function MetaTag() {
  // Description for the meta tag
  const description =
    "Transform education with Ascend, the leading School Management System in Nigeria. Streamline administration, elevate learning experiences, and empower institutions for a brighter future. Discover efficiency and innovation in every aspect of educational management with Ascend.";

  // URL for Ascend logo
  const ascendLogoUrl =
    "https://res.cloudinary.com/duakn882p/image/upload/v1704301962/Ascend-Logo-FullLockup-FBlack_1_1_u1nm7k.png";

  return (
    <Head>
      {/* SEO Meta Tags */}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Nigerian school management system,school management system,  innovative education technology, Ascend app, track student progress, Nigerian school,school, management, system, dashboard, education, student, enrollment, attendance, grades, curriculum, teachers, parents, communication, administration, online, learning, academic, records, scheduling, timetable, examinations, assessments, performance, analytics, reports, integrated, platform, user-friendly, efficient, secure, school software, educational technology, digital, information system, school administration, learning management, institute, institution, college, university, educational management, student information, progress tracking, communication, data management, school portal, e-learning, educational resources, academic performance, student records, school records, parent-teacher communication, education technology, school operations, administration software, school data, education management, classroom management, school app, academic planning, student management, teacher management, parent portal, educational software, student success, school leadership, educational administration, student engagement, learning analytics, academic excellence, educational platform, school improvement, curriculum management, school organization, education software, academic planning, educational leadership, school communication, educational innovation, school technology, school efficiency, educational resources, school development, school progress, educational insights, learning outcomes, institutional management, school productivity, academic success, student success, educational insights, digital transformation, school information system, education administration, school performance, educational insights, digital transformation, school information system, education administration, school performance"
      />
      {/* <meta name="title" content="Ascend - School Management System" /> */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="2 days" />
      <meta name="author" content="Ascend Technology" />
      <meta name="robots" content="index, follow" />

      {/* Twitter Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ascend.africa/" />
      <meta
        property="twitter:title"
        content="Ascend - School Management System"
      />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ascendLogoUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ascend.africa/" />
      <meta property="og:image" content={ascendLogoUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="120" />
      <meta property="og:image:height" content="26" />
      <meta property="og:title" content="Ascend - School Management System" />
      <meta property="og:description" content={description} />

      {/* Viewport Settings */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Page Title */}
      <title>Ascend - School Management System</title>

      {/* Favicon */}
      <link rel="shortcut icon" href={ascendLogoUrl} type="image/x-icon" />

      {/* Googlebot Settings */}
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, crawl-delay:2"
      />

      {/* Apple Touch Icon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      {/* Additional Favicon Sizes */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Head>
  );
}
