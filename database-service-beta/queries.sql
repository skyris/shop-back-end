CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  price INT
);

CREATE TABLE IF NOT EXISTS stocks (
  product_id uuid,
  FOREIGN KEY (product_id) REFERENCES products (id),
  UNIQUE (product_id),
  count INT
);

INSERT INTO products (title, author, description, price) VALUES
(
  'AWS: The Ultimate Guide From Beginners To Advanced For The Amazon Web Services (2020 Edition)',
  'Theo H. King',
  'If cloud computing is one of the leading trends in the IT industry (and it most certainly is), then Amazon Web Services Platform (AWS) is the champion of that trend. If you want to be a part of the competitive markets, you need to jump on this ascending wagon and get familiar with the AWS.',
  4.79
),
(
  'Amazon Web Services in Action',
  'Andreas Wittig, Michael Wittig',
  'Amazon Web Services in Action, Second Edition is a comprehensive introduction to computing, storing, and networking in the AWS cloud. You''ll find clear, relevant coverage of all the essential AWS services you to know, emphasizing best practices for security, high availability and scalability.',
  41.99
),
(
  'AWS for Solutions Architects: Design your cloud infrastructure by implementing DevOps, containers, and Amazon Web Services',
  'Alberto Artasanchez',
  'Apply cloud design patterns to overcome real-world challenges by building scalable, secure, highly available, and cost-effective solutions',
  17.19
),
(
  'AWS Certified Cloud Practitioner Study Guide: CLF-C01 Exam',
  'Ben Piper, David Clinton',
  'Take the next step in your career by expanding and validating your skills on the Amazon Web Services (AWS) Cloud. The AWS Certified Cloud Practitioner Study Guide: Exam CLF-C01 provides a solid introduction to this industry-leading technology, relied upon by thousands of businesses across the globe, as well as the resources you need to prove your knowledge in the AWS Certification Exam.',
  30
),
(
  'AWS Certified Solutions Architect Study Guide: Associate SAA-CO2 Exam (Aws Certified Solutions Architect Official: Associate Exam)',
  'Ben Piper, David Clinton',
  'AWS Certified Solutions Study Guide: Associate (SAA-C02) Exam, Third Edition comprehensively and efficiently prepares you for the SAA-C02 Exam. The study guide contains robust and effective study tools that will help you succeed on the exam. The guide grants you access to the regularly updated Sybex online learning environment and test bank, which contains hundreds of test questions, bonus practice exams, electronic flashcards, and a glossary of key terms.',
  35.99
),
(
  'Data Science on AWS: Implementing End-to-End, Continuous AI and Machine Learning Pipelines',
  'Chris Fregly, Antje Barth',
  'With this practical book, AI and machine learning practitioners will learn how to successfully build and deploy data science projects on Amazon Web Services. The Amazon AI and machine learning stack unifies data science, data engineering, and application development to help level up your skills. This guide shows you how to build and run pipelines in the cloud, then integrate the results into applications in minutes instead of days. Throughout the book, authors Chris Fregly and Antje Barth demonstrate how to reduce cost and improve performance.',
  33.99
),
(
  'AWS Certified Machine Learning Specialty: MLS-C01 Certification Guide: The definitive guide to passing the MLS-C01 exam on the very first attempt',
  'Somanath Nanda, Weslley Moura',
  'The AWS Certified Machine Learning Specialty exam tests your competency to perform machine learning (ML) on AWS infrastructure. This book covers the entire exam syllabus using practical examples to help you with your real-world machine learning projects on AWS.',
  21.74
),
(
  'AWS Certified Cloud Practitioner Training Notes',
  'Neal Davis',
  'Based on the latest CLF-C01 exam blueprint, these training notes will shortcut your study time and maximize your chance of passing the AWS Certified Cloud Practitioner exam first time.',
  24.99
),
(
  'AWS: The Most Complete Guide to Amazon Web Services from Beginner to Advanced Level',
  'Raoul Alongi',
  'Struggling to Come to Grips With Cloud Technology?',
  16.99
);

-- After inserting products, we get thier ids:
SELECT * FROM products;
-- Then we use them filling stocks table:


INSERT INTO stocks (product_id, count) VALUES
('7a22dae6-e205-4d94-a792-46c0524052ba', 4),
('7785cc5e-8851-433e-956c-849811470cad', 6),
('9ca98e40-8f8f-4833-b8af-c5e3064ba319', 12),
('b59e7ab5-b768-4ef5-a827-51bed94d8ba3', 20),
('677350ee-ebfd-4e60-aee5-cdabb18180bb', 25),
('23ffed52-3d42-405e-a7df-eb4f1f1d6c60', 23),
('1d041e56-9b11-46be-958b-8a1d35d0de9b', 40),
('e723c532-e894-4b93-8ff5-0e77dd018338', 17),
('c4c022c7-d6be-40ec-8f42-d98ecce36805', 14);



SELECT id, title, author, description, count, price
FROM products
FULL JOIN stocks
ON stocks.product_id=products.id
WHERE id='7a22dae6-e205-4d94-a792-46c0524052ba';
