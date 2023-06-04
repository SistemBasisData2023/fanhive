--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-06-04 18:50:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 241 (class 1255 OID 106496)
-- Name: strip_tags(text); Type: FUNCTION; Schema: public; Owner: satyaananda65
--

CREATE FUNCTION public.strip_tags(text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
    SELECT regexp_replace($1, E'<[^>]+>', '', 'gi');
$_$;


ALTER FUNCTION public.strip_tags(text) OWNER TO satyaananda65;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 73762)
-- Name: chapters; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.chapters (
    chapterid integer NOT NULL,
    storyid integer,
    chapter_number integer NOT NULL,
    chapter_title character varying(255) NOT NULL,
    chapter_content text NOT NULL,
    date_posted date DEFAULT CURRENT_DATE
);


ALTER TABLE public.chapters OWNER TO satyaananda65;

--
-- TOC entry 218 (class 1259 OID 73761)
-- Name: chapters_chapterid_seq; Type: SEQUENCE; Schema: public; Owner: satyaananda65
--

CREATE SEQUENCE public.chapters_chapterid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chapters_chapterid_seq OWNER TO satyaananda65;

--
-- TOC entry 2652 (class 0 OID 0)
-- Dependencies: 218
-- Name: chapters_chapterid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satyaananda65
--

ALTER SEQUENCE public.chapters_chapterid_seq OWNED BY public.chapters.chapterid;


--
-- TOC entry 228 (class 1259 OID 73840)
-- Name: comments; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.comments (
    commentid integer NOT NULL,
    userid integer,
    storyid integer,
    comment_content text NOT NULL,
    date_posted date DEFAULT CURRENT_DATE
);


ALTER TABLE public.comments OWNER TO satyaananda65;

--
-- TOC entry 227 (class 1259 OID 73839)
-- Name: comments_commentid_seq; Type: SEQUENCE; Schema: public; Owner: satyaananda65
--

CREATE SEQUENCE public.comments_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_commentid_seq OWNER TO satyaananda65;

--
-- TOC entry 2653 (class 0 OID 0)
-- Dependencies: 227
-- Name: comments_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satyaananda65
--

ALTER SEQUENCE public.comments_commentid_seq OWNED BY public.comments.commentid;


--
-- TOC entry 221 (class 1259 OID 73777)
-- Name: fandoms; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.fandoms (
    fandomid integer NOT NULL,
    fandom_name character varying(100) NOT NULL
);


ALTER TABLE public.fandoms OWNER TO satyaananda65;

--
-- TOC entry 220 (class 1259 OID 73776)
-- Name: fandoms_fandomid_seq; Type: SEQUENCE; Schema: public; Owner: satyaananda65
--

CREATE SEQUENCE public.fandoms_fandomid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fandoms_fandomid_seq OWNER TO satyaananda65;

--
-- TOC entry 2654 (class 0 OID 0)
-- Dependencies: 220
-- Name: fandoms_fandomid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satyaananda65
--

ALTER SEQUENCE public.fandoms_fandomid_seq OWNED BY public.fandoms.fandomid;


--
-- TOC entry 229 (class 1259 OID 73859)
-- Name: followers; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.followers (
    followerid integer NOT NULL,
    followedid integer NOT NULL
);


ALTER TABLE public.followers OWNER TO satyaananda65;

--
-- TOC entry 226 (class 1259 OID 73824)
-- Name: heart; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.heart (
    userid integer NOT NULL,
    storyid integer NOT NULL
);


ALTER TABLE public.heart OWNER TO satyaananda65;

--
-- TOC entry 217 (class 1259 OID 73745)
-- Name: stories; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.stories (
    storyid integer NOT NULL,
    title character varying(255) NOT NULL,
    authorid integer,
    date_posted date DEFAULT CURRENT_DATE,
    story_desc text NOT NULL,
    story_cover text DEFAULT 'DefaultNoCover.png'::text,
    is_finished boolean DEFAULT false
);


ALTER TABLE public.stories OWNER TO satyaananda65;

--
-- TOC entry 216 (class 1259 OID 73744)
-- Name: stories_storyid_seq; Type: SEQUENCE; Schema: public; Owner: satyaananda65
--

CREATE SEQUENCE public.stories_storyid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stories_storyid_seq OWNER TO satyaananda65;

--
-- TOC entry 2655 (class 0 OID 0)
-- Dependencies: 216
-- Name: stories_storyid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satyaananda65
--

ALTER SEQUENCE public.stories_storyid_seq OWNED BY public.stories.storyid;


--
-- TOC entry 222 (class 1259 OID 73785)
-- Name: story_fandoms; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.story_fandoms (
    storyid integer NOT NULL,
    fandomid integer NOT NULL
);


ALTER TABLE public.story_fandoms OWNER TO satyaananda65;

--
-- TOC entry 225 (class 1259 OID 73809)
-- Name: story_tags; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.story_tags (
    storyid integer NOT NULL,
    tagid integer NOT NULL
);


ALTER TABLE public.story_tags OWNER TO satyaananda65;

--
-- TOC entry 224 (class 1259 OID 73801)
-- Name: tags; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.tags (
    tagid integer NOT NULL,
    tag_name character varying(80) NOT NULL
);


ALTER TABLE public.tags OWNER TO satyaananda65;

--
-- TOC entry 223 (class 1259 OID 73800)
-- Name: tags_tagid_seq; Type: SEQUENCE; Schema: public; Owner: satyaananda65
--

CREATE SEQUENCE public.tags_tagid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_tagid_seq OWNER TO satyaananda65;

--
-- TOC entry 2656 (class 0 OID 0)
-- Dependencies: 223
-- Name: tags_tagid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satyaananda65
--

ALTER SEQUENCE public.tags_tagid_seq OWNED BY public.tags.tagid;


--
-- TOC entry 215 (class 1259 OID 73729)
-- Name: users; Type: TABLE; Schema: public; Owner: satyaananda65
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(200) NOT NULL,
    email character varying(75) NOT NULL,
    cover_pic text DEFAULT 'DefaultBackgroundProfile.jpg'::text,
    profile_pic text DEFAULT 'BlankProfilePic.png'::text,
    registration_date date DEFAULT CURRENT_DATE
);


ALTER TABLE public.users OWNER TO satyaananda65;

--
-- TOC entry 214 (class 1259 OID 73728)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: satyaananda65
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO satyaananda65;

--
-- TOC entry 2657 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satyaananda65
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 2441 (class 2604 OID 73765)
-- Name: chapters chapterid; Type: DEFAULT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.chapters ALTER COLUMN chapterid SET DEFAULT nextval('public.chapters_chapterid_seq'::regclass);


--
-- TOC entry 2445 (class 2604 OID 73843)
-- Name: comments commentid; Type: DEFAULT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.comments ALTER COLUMN commentid SET DEFAULT nextval('public.comments_commentid_seq'::regclass);


--
-- TOC entry 2443 (class 2604 OID 73780)
-- Name: fandoms fandomid; Type: DEFAULT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.fandoms ALTER COLUMN fandomid SET DEFAULT nextval('public.fandoms_fandomid_seq'::regclass);


--
-- TOC entry 2437 (class 2604 OID 73748)
-- Name: stories storyid; Type: DEFAULT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.stories ALTER COLUMN storyid SET DEFAULT nextval('public.stories_storyid_seq'::regclass);


--
-- TOC entry 2444 (class 2604 OID 73804)
-- Name: tags tagid; Type: DEFAULT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.tags ALTER COLUMN tagid SET DEFAULT nextval('public.tags_tagid_seq'::regclass);


--
-- TOC entry 2433 (class 2604 OID 73732)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 2636 (class 0 OID 73762)
-- Dependencies: 219
-- Data for Name: chapters; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.chapters (chapterid, storyid, chapter_number, chapter_title, chapter_content, date_posted) FROM stdin;
1	1	1	Hour of Wolf	In the gloomy awakening of the mighty wolf prince...	2023-05-31
2	1	2	Eternal Man	A spoonful of miracle, hes a guaranteed eternal sanctuary...	2023-05-31
4	9	2	Fragile	<p>Chapter 2 from the distance...</p>	2023-06-02
3	9	1	I Could Sing A Long Up	<p>Chapter 1 created from website and updated...</p>	2023-06-02
5	1	3	Brakenburg	<p>It was absurd to say the man was patronizing enough...</p>	2023-06-02
6	10	1	Mount Everest Updated	<p>This is a chapter one from It's High Noon but reimagined...</p>	2023-06-03
7	11	1	Contoh chapter	<p>Contoh ini isii</p>	2023-06-03
8	11	2	Contoh chapter2	<p>contoh aja</p>	2023-06-03
\.


--
-- TOC entry 2645 (class 0 OID 73840)
-- Dependencies: 228
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.comments (commentid, userid, storyid, comment_content, date_posted) FROM stdin;
2	2	10	This is an amazing story.	2023-06-04
3	2	10	Truly, sensational plz	2023-06-04
4	2	10	ILY	2023-06-04
5	3	10	I agree.	2023-06-04
\.


--
-- TOC entry 2638 (class 0 OID 73777)
-- Dependencies: 221
-- Data for Name: fandoms; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.fandoms (fandomid, fandom_name) FROM stdin;
1	Elden Ring
2	Powersinger
3	Batman
4	Original Works
8	Naruto
12	Netlab
\.


--
-- TOC entry 2646 (class 0 OID 73859)
-- Dependencies: 229
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.followers (followerid, followedid) FROM stdin;
4	2
2	3
3	2
\.


--
-- TOC entry 2643 (class 0 OID 73824)
-- Dependencies: 226
-- Data for Name: heart; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.heart (userid, storyid) FROM stdin;
2	10
2	11
3	11
\.


--
-- TOC entry 2634 (class 0 OID 73745)
-- Dependencies: 217
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.stories (storyid, title, authorid, date_posted, story_desc, story_cover, is_finished) FROM stdin;
7	Anima Mundi	2	2023-06-01	<p>See the moonlight shines bright.</p>	1685618955779Collab.png	f
1	The Winds and Wuthering	2	2023-05-31	This is basic description of the tragic tale between the winds and the wuthering. Can they prevail?	DefaultNoCover.png	f
2	Angus McFife	3	2023-05-31	Revenge of Zargothrax	DefaultNoCover.png	f
9	Test Doang	2	2023-06-02	<p>Ini hanya sebuah test dan uji update tags.</p>	DefaultNoCover.png	t
10	It's High Noon	4	2023-06-03	<p>Ini adalah uji coba dari akun ketiga terupdate</p>	1685758373511SampleCerita.jpg	t
11	Progress Report Update	2	2023-06-03	<p>Contoh ajaaa update</p>	1685772464797237147524c2cd1f1b0fe986bbcb10871.jpg	t
\.


--
-- TOC entry 2639 (class 0 OID 73785)
-- Dependencies: 222
-- Data for Name: story_fandoms; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.story_fandoms (storyid, fandomid) FROM stdin;
7	2
9	4
10	8
11	12
\.


--
-- TOC entry 2642 (class 0 OID 73809)
-- Dependencies: 225
-- Data for Name: story_tags; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.story_tags (storyid, tagid) FROM stdin;
7	3
7	4
7	5
9	9
9	10
9	15
10	17
10	16
10	18
10	1
11	29
11	30
\.


--
-- TOC entry 2641 (class 0 OID 73801)
-- Dependencies: 224
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.tags (tagid, tag_name) FROM stdin;
2	Adventure
3	Angst
4	Fluff
5	Enemies to Lovers
6	Detective
7	Mystery
8	Revenge
9	Crime
10	Thriller
15	Horror
17	Family
16	Ninja
18	Rivalry
1	Romance
29	Racing
30	Sports
\.


--
-- TOC entry 2632 (class 0 OID 73729)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: satyaananda65
--

COPY public.users (userid, username, password, email, cover_pic, profile_pic, registration_date) FROM stdin;
4	rainelgratio	$2a$10$A1byV/JHh3cXJ3Jr7gBkpudkVRF0kNSM37CNagnaHZXdD4hXMq4Lq	rain@proton.com	DefaultBackgroundProfile.jpg	BlankProfilePic.png	2023-06-02
3	eldisjawr	$2a$10$glTi6Y56gueBVd3EeOILOeCSGCyP7PhNu1pqjE709C1IldFb6mCp6	eldis@yahoo.com	DefaultBackgroundProfile.jpg	BlankProfilePic.png	2023-05-30
2	satyaand	$2a$10$pn9q7m0nfYPQU.xJAEecDu5zl7n1SHwZ2h1A883UBw010rI9w.wxO	satyaananda65@gmail.com	1685786138146photomode_17122020_154314.png	1685787365556KirbyRock.jpg	2023-05-30
\.


--
-- TOC entry 2658 (class 0 OID 0)
-- Dependencies: 218
-- Name: chapters_chapterid_seq; Type: SEQUENCE SET; Schema: public; Owner: satyaananda65
--

SELECT pg_catalog.setval('public.chapters_chapterid_seq', 9, true);


--
-- TOC entry 2659 (class 0 OID 0)
-- Dependencies: 227
-- Name: comments_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: satyaananda65
--

SELECT pg_catalog.setval('public.comments_commentid_seq', 5, true);


--
-- TOC entry 2660 (class 0 OID 0)
-- Dependencies: 220
-- Name: fandoms_fandomid_seq; Type: SEQUENCE SET; Schema: public; Owner: satyaananda65
--

SELECT pg_catalog.setval('public.fandoms_fandomid_seq', 14, true);


--
-- TOC entry 2661 (class 0 OID 0)
-- Dependencies: 216
-- Name: stories_storyid_seq; Type: SEQUENCE SET; Schema: public; Owner: satyaananda65
--

SELECT pg_catalog.setval('public.stories_storyid_seq', 12, true);


--
-- TOC entry 2662 (class 0 OID 0)
-- Dependencies: 223
-- Name: tags_tagid_seq; Type: SEQUENCE SET; Schema: public; Owner: satyaananda65
--

SELECT pg_catalog.setval('public.tags_tagid_seq', 33, true);


--
-- TOC entry 2663 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: satyaananda65
--

SELECT pg_catalog.setval('public.users_userid_seq', 4, true);


--
-- TOC entry 2456 (class 2606 OID 73770)
-- Name: chapters chapters_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (chapterid);


--
-- TOC entry 2474 (class 2606 OID 73848)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (commentid);


--
-- TOC entry 2460 (class 2606 OID 73784)
-- Name: fandoms fandoms_fandom_name_key; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.fandoms
    ADD CONSTRAINT fandoms_fandom_name_key UNIQUE (fandom_name);


--
-- TOC entry 2462 (class 2606 OID 73782)
-- Name: fandoms fandoms_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.fandoms
    ADD CONSTRAINT fandoms_pkey PRIMARY KEY (fandomid);


--
-- TOC entry 2476 (class 2606 OID 73863)
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (followerid, followedid);


--
-- TOC entry 2472 (class 2606 OID 73828)
-- Name: heart heart_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.heart
    ADD CONSTRAINT heart_pkey PRIMARY KEY (userid, storyid);


--
-- TOC entry 2454 (class 2606 OID 73755)
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (storyid);


--
-- TOC entry 2464 (class 2606 OID 73789)
-- Name: story_fandoms story_fandoms_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.story_fandoms
    ADD CONSTRAINT story_fandoms_pkey PRIMARY KEY (storyid, fandomid);


--
-- TOC entry 2470 (class 2606 OID 73813)
-- Name: story_tags story_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.story_tags
    ADD CONSTRAINT story_tags_pkey PRIMARY KEY (storyid, tagid);


--
-- TOC entry 2466 (class 2606 OID 73806)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tagid);


--
-- TOC entry 2468 (class 2606 OID 73808)
-- Name: tags tags_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_tag_name_key UNIQUE (tag_name);


--
-- TOC entry 2458 (class 2606 OID 98305)
-- Name: chapters unique_story_chapter; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT unique_story_chapter UNIQUE (storyid, chapter_number);


--
-- TOC entry 2448 (class 2606 OID 73743)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2450 (class 2606 OID 73739)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 2452 (class 2606 OID 73741)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2478 (class 2606 OID 73771)
-- Name: chapters chapters_storyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_storyid_fkey FOREIGN KEY (storyid) REFERENCES public.stories(storyid) ON DELETE CASCADE;


--
-- TOC entry 2485 (class 2606 OID 73854)
-- Name: comments comments_storyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_storyid_fkey FOREIGN KEY (storyid) REFERENCES public.stories(storyid) ON DELETE CASCADE;


--
-- TOC entry 2486 (class 2606 OID 73849)
-- Name: comments comments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 2487 (class 2606 OID 73869)
-- Name: followers followers_followedid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_followedid_fkey FOREIGN KEY (followedid) REFERENCES public.users(userid);


--
-- TOC entry 2488 (class 2606 OID 73864)
-- Name: followers followers_followerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_followerid_fkey FOREIGN KEY (followerid) REFERENCES public.users(userid);


--
-- TOC entry 2483 (class 2606 OID 114688)
-- Name: heart heart_storyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.heart
    ADD CONSTRAINT heart_storyid_fkey FOREIGN KEY (storyid) REFERENCES public.stories(storyid) ON DELETE CASCADE;


--
-- TOC entry 2484 (class 2606 OID 73829)
-- Name: heart heart_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.heart
    ADD CONSTRAINT heart_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- TOC entry 2477 (class 2606 OID 73756)
-- Name: stories stories_authorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_authorid_fkey FOREIGN KEY (authorid) REFERENCES public.users(userid);


--
-- TOC entry 2479 (class 2606 OID 73795)
-- Name: story_fandoms story_fandoms_fandomid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.story_fandoms
    ADD CONSTRAINT story_fandoms_fandomid_fkey FOREIGN KEY (fandomid) REFERENCES public.fandoms(fandomid);


--
-- TOC entry 2480 (class 2606 OID 114693)
-- Name: story_fandoms story_fandoms_storyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.story_fandoms
    ADD CONSTRAINT story_fandoms_storyid_fkey FOREIGN KEY (storyid) REFERENCES public.stories(storyid) ON DELETE CASCADE;


--
-- TOC entry 2481 (class 2606 OID 114698)
-- Name: story_tags story_tags_storyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.story_tags
    ADD CONSTRAINT story_tags_storyid_fkey FOREIGN KEY (storyid) REFERENCES public.stories(storyid) ON DELETE CASCADE;


--
-- TOC entry 2482 (class 2606 OID 73819)
-- Name: story_tags story_tags_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: satyaananda65
--

ALTER TABLE ONLY public.story_tags
    ADD CONSTRAINT story_tags_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tags(tagid);


-- Completed on 2023-06-04 18:50:43

--
-- PostgreSQL database dump complete
--

