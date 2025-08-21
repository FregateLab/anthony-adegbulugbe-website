"use client"

import type React from "react"

import { useState, useRef, useEffect, use } from "react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Download,
  Share2,
  BookOpen,
  Video,
  Headphones,
  FileText,
  MessageCircle,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Theme data structure
const themes = {
  "Journey of Love": {
    title: "Journey of Love",
    description: "A comprehensive exploration of God's love through advent and beyond",
    sermons: [
      { id: 1, title: "HIS BANNER OVER US IS LOVE", date: "July 1, 2017" },
      { id: 2, title: "DIMENSIONS OF THE LOVE OF GOD", date: "July 2, 2017" },
      { id: 3, title: "UNBREAKABLE CHORD OF DIVINE LOVE", date: "July 16, 2017" },
      { id: 4, title: "INTRODUCTION: JOURNEY OF LOVE", date: "December 1, 2018" },
      { id: 5, title: "THE LOVE OF GOD: PART 1", date: "December 2, 2018" },
      { id: 6, title: "BENEFITS OF THE LOVE OF GOD", date: "December 9, 2018" },
      { id: 7, title: "CHRISTMAS REFLECTIONS ON THE LOVE OF GOD", date: "December 24, 2018" },
      { id: 8, title: "HE BECAME POOR SO THAT WE MAY BE RICH", date: "December 25, 2018" },
      { id: 9, title: "LOVING GOD MORE", date: "December 30, 2018" },
    ],
  },
  "Operation Declare & Decree": {
    title: "Operation Declare & Decree",
    description: "Understanding the power of declaration and decree in the Christian life",
    sermons: [
      { id: 10, title: "OPERATION DECLARE AND DECREE: PART 1", date: "December 15, 2024" },
      { id: 11, title: "OPERATION DECLARE AND DECREE: PART 2", date: "December 22, 2024" },
      { id: 12, title: "OPERATION DECLARE AND DECREE: PART 3", date: "December 29, 2024" },
    ],
  },
  "Faithful in Ministry": {
    title: "Faithful in Ministry",
    description: "Principles of faithful service and stewardship in God's kingdom",
    sermons: [
      { id: 13, title: "FAITHFUL IN MINISTRY: STEWARDSHIP PRINCIPLES", date: "January 7, 2024" },
      { id: 14, title: "FAITHFUL IN MINISTRY: SERVANT LEADERSHIP", date: "January 14, 2024" },
      { id: 15, title: "FAITHFUL IN MINISTRY: ENDURING TO THE END", date: "January 21, 2024" },
    ],
  },
  "Hours of Divine Intervention": {
    title: "Hours of Divine Intervention",
    description: "Recognizing and responding to God's intervention in our lives",
    sermons: [
      { id: 16, title: "HOURS OF DIVINE INTERVENTION: BREAKTHROUGH PRAYER", date: "February 4, 2024" },
      { id: 17, title: "HOURS OF DIVINE INTERVENTION: MIRACULOUS PROVISION", date: "February 11, 2024" },
      { id: 18, title: "HOURS OF DIVINE INTERVENTION: DIVINE HEALING", date: "February 18, 2024" },
    ],
  },
}

// Mock sermon data - in real app, this would come from API/database
const getSermonById = (id: string) => {
  const sermons = {
    "1": {
      id: 1,
      title: "HIS BANNER OVER US IS LOVE",
      category: "Journey of Love",
      date: "July 1, 2017",
      duration: "30 min",
      summary:
        "The divinely inspired theme introducing God's love as our banner of protection and blessing. God brings us to His banqueting house where His banner of love provides security and announces us as His beloved children.",
      keyPoints: ["God's banner of love over us", "Divine protection and security", "Promises of blessing and favor"],
      scripture: "Song of Solomon 2:4",
      fullScripture: "He brought me to the banqueting house, And his banner over me was love.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/his-banner-over-us-is-love.mp3",
      videoUrl: "/sermons/video/his-banner-over-us-is-love.mp4",
      fullText: `# HIS BANNER OVER US IS LOVE

## Introduction

I welcome you all in the name of our Lord and Saviour Jesus to this brand new month, the seventh month in the year, the month of July, 2017. If we are to use the contemporary language of the popular game of football, we are now in the second half of the 2017 game. Without any iota of doubt in my mind, our Lord has been faithful, gracious and merciful unto each and every one of us in the first half, and His faithfulness will endure for this second half of the year in the name of Jesus. Amen.

I declare and affirm the faithfulness of the Almighty God and therefore decree that His grace will increase, His blessings will abound, His glory will glow and His love will radiate in your lives in this new month of July 2017 and beyond in the name of Jesus. Amen.

## God is Love

It is good to know, praise and worship our God because of His many attributes. One of the dominant attribute of God that our Lord and Saviour Jesus revealed to the world during His mission here on earth is the fact that God is love:

*"Whoever does not love does not know God because God is love"* (1 John 4: 8).

In this wonderful revelation, Jesus taught all of us to pray to a divine Father rather than a supreme being ever so eager to avenge human beings for our wrong doings or a remote being too majestic, mighty and holy to interact with mere sinful creatures like us.

## The Depth of Divine Love

As Christians we know very well the Bible verses telling us that God is love and that God loves us. We sing these truths in our songs and hymns. Sometimes though we are not so sure of this Divine love especially when things go contrary or when we are being disciplined as a loving gesture by the Divine Father. What is not well known is the depth, width, height and length of divine love. Due to our human limitations and humanity flawed concept of love, we simply do not appreciate how dearly and passionately God loves us.

## The Theme for July 2017

Therefore, Children of God, the divinely inspired theme for our Church for the month of July 2017 is 'The Love of God.' Brethren, love is going to be in the air in this new month. That is, Divine love will be all around us. Hence, we will hear messages about our heavenly Father's love for us. We will feel the effect of His love in our lives.

I declare and decree that the steadfast love of God will be manifested in our lives in very vivid ways in this month and beyond in the name of Jesus. Amen.

I declare and decree that the unchanging, unconditional, unrelenting, unlimited, unfailing and uncomplicated love of God will guide and define your destiny from this month on in the name of Jesus. Amen.

## The Promise: His Banner Over Us is Love

As expected, great promises of love is embedded in the divinely inspired theme of our Church this month. We will only mention two this morning.

One of the promises is found in Songs of Solomon 2:4:

*"He brought me to the banqueting house, And his banner over me was love."*

This biblical verse has inspired a song titled "His Banner Over Me Is Love," which first stanza reads:

*His banner over me is love,*
*His banner over me is love;*
*He brought me into His banqueting house,*
*And His banner over me is love.*

The divine promise for you this month is that God will bring you to a banquet where He will lavishly bless you. In this banquet, 'everything will be mega mega.' While there, God will set His banner of love over you such that all will see it. The banner of love will provide you security by instilling fear into all those who may have an evil design over you.

I declare and decree that in this new month, God will bring you to a banqueting house for blessings, good health, spiritual refreshing and joy in the name of Jesus. Amen.

I declare and decree that in the new month the divine banner of love over you will announce you as a beloved child of God and make you untouchable for Satan and his minions, in the name of Jesus. Amen.

## The Promise: All Will Be Well

The other promise is that, starting from this new month, by virtue of the love of God which you will experience in a significant way, wonderful things you never imagine would happen in your life. The song writer, Ms Peters, put this very succinctly in her lyrics of the hymn titled 'Through the love of God our Savior':

*Through the love of God our Savior,*
*All will be well*
*Free and changeless is His favor,*
*All, all is well*
*Precious is the blood that healed us*
*Perfect is the grace that sealed us*
*Strong the hand stretched forth to shield us,*
*All must be well.*

## Declarations and Decrees

Brethren, in this new month as you go about your journey in this pilgrim way which you have not passed through before, through the love of God, I declare and decree that you will overcome your challenges in the name of Jesus. Amen.

I declare and decree that no matter what the world may throw at you, you will be victorious in the name of Jesus. Amen.

I declare and decree that the grace of God will abound in your life in the name of Jesus. Amen.

I declare and decree that the strong hands of the loving Father will shield and protect you in the name of Jesus. Amen.

And so shall it be in the name of Jesus, Amen.

## Conclusion

Children of God, as we embark on this journey through the month of July under the theme "The Love of God," remember that His banner over you is love. This banner provides protection, announces your identity as God's beloved child, and ensures that all will be well in your life.

May you experience the depth, width, height, and length of God's love in unprecedented ways. May His love guide your steps, protect your path, and bless your endeavors abundantly.

In Jesus' name, Amen.`,
      relatedSermons: [
        { id: 2, title: "DIMENSIONS OF THE LOVE OF GOD" },
        { id: 3, title: "UNBREAKABLE CHORD OF DIVINE LOVE" },
      ],
    },
    "2": {
      id: 2,
      title: "DIMENSIONS OF THE LOVE OF GOD",
      category: "Journey of Love",
      date: "July 2, 2017",
      duration: "42 min",
      summary:
        "Exploring six dimensions of God's love through John 3:16 - extraordinary, extensive, expensive, embracing, exclusive, and eternal love that transforms lives like Nicodemus.",
      keyPoints: [
        "Six dimensions of divine love",
        "God's love is extraordinary and extensive",
        "Expensive, embracing, exclusive, and eternal",
      ],
      scripture: "John 3:1-16",
      fullScripture:
        "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/dimensions-of-love-of-god.mp3",
      videoUrl: "/sermons/video/dimensions-of-love-of-god.mp4",
      fullText: `# DIMENSIONS OF THE LOVE OF GOD

## Introduction

I welcome you all to this special combined service this morning. If Jesus Christ, our Lord and Saviour tarries His second coming, may we enjoy many glorious services like this in the name of Jesus. Amen.

This month is the first month in the second half of the year 2017 and we have cause to thank God for His faithfulness. I am persuaded that the God who has been showering blessings on us since the beginning of the year will continue to do so, in the name of Jesus. Amen.

Yesterday at the 'Operation Declare and Decree' service, the divinely inspired theme for our Church for the month on July was unveiled. It is 'The Love of God.' In the short exhortation in that service, we were reminded that while we are conversant with the theme that God is love and that He loves us, what is not well appreciated is the depth, width, height and length of that divine love.

## Jesus Teaches Nicodemus

As a starting point, let us put into context what brought about this famous verse. The Bible tells us that these immortal words in this verse came about during the conversation between Jesus and Nicodemus when the latter visited Jesus in the night. As we are all aware, Nicodemus was a Pharisee and a member of the ruling council, Sanhedrin.

During this nocturnal visit, Jesus told Nicodemus he had to be born again if he wanted to be a candidate of the kingdom of God (John 3:3). Nicodemus did not understand this spiritual concept. It was from the answer that Jesus gave to this last question that find the famous biblical verse, John 3:16:

*"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."*

## Six Dimensions of the Love of God

Brethren, millions of word have been written about the 26 words in John 3:16. This morning we shall explore briefly the six dimensions of this priceless crystal and difficult-to-described-with-human-vocabulary phenomenon called the Love of God:

- God's Love is Extraordinary
- God's love is Extensive
- God's love is Expensive
- God's love is Embracing
- God's love is Exclusive
- God's love is Eternal

### 1. God's Love is Extraordinary - "For God so love"

The first dimension of God's love is that it is extravagant and extraordinary. This we can deduce from "For God so loved." It was Jesus that first revealed love as an attribute of God to man. God has always been a loving Father. But before Jesus, amongst the Jews, the perception of God was that of a holy God who is quick to punish man for his wrong doings.

But if we closely looked at the third word in that verse, "so," we would discover that it qualifies the love that God has for the world. It is telling us that God loves humanity too much. It is an extravagant love. It is not I love today, I despise tomorrow. It is the love that is constant even when we are unfaithful or far away from God.

### 2. God's Love is Extensive - "...the world"

The second dimension is related to the recipient of God's love. What God loves is the whole world. What an extensive love! To the Jews in the time of Nicodemus, God is only for the Jews and not for the Gentiles. So the concept of a God who loves the whole world is distinctly Christian reality.

The Greek word is 'Kosmos', and one of the shades of meaning of that word is the whole mass of unregenerate men alienated from God. So in effect, God's love includes even the unlovable and those against the plan and purpose of the true and only God.

### 3. God's love is Expensive - "...that he gave his one and only Son"

God's love is not only extensive, it is also expensive because it is sealed with the precious blood of Jesus. When God looked at the lot of man and decided to redeem mankind from the power and clutches of sin and Satan, he sent His unique Son to come into the world and pay the ransom for your sine and my sins on the cross of Calvary.

### 4. God's love is Embracing - "...that whoever"

The love of God is not only extensive (covering the whole world), it is also all-embracing and expansive because it applies to the individual. It is personal. That is the import of the word 'whoever.' You must never forget the personal nature of the love of God.

### 5. God's love is Exclusive - "...believes in Him"

The love of God is extensive and available for everyone in principle. To access the greatest benefit of this love which is salvation, we need to have a password. The only password that we need is to believe in Jesus for our salvation.

### 6. God's love is Eternal - "...shall not perish but have eternal life"

We now come to the final dimension of the love of God which is about its intent. God loves us because he does not want a permanent separation of humanity from Him. He wants us to have a certain quality of life of fellowship with Him. That life starts from here on earth and continues for ever when our physical life is over here on earth.

## Back to Nicodemus

Let us go back to the story of Nicodemus which forms the background to this famous verse. The Bible did not specifically mention what happened to Nicodemus after the interaction with Jesus. But we can deduce that this Pharisee came out of that encounter a changed man.

When we heard about Nicodemus again, it is in John 7 when the Pharisees were planning to arrest and eliminate Jesus. Nicodemus came out finally in the open and spoke on the side of fair play and justice. The last we heard about this man whose life was changed by the discussion on the love of God was in John chapter 19 where he joined with Joseph of Arimathea to give Jesus a decent burial.

## Conclusion

As we bring this message to a close, I will like to inform you that there are many more aspects of the love of God we have not touched in this sermon. I pray that the Word of God that you hear will multiply in your hearts and make you fruitful in the name of Jesus. Amen.

When Nicodemus heard about the love of God in that famous verse, John 3:16, he became a changed man. His perception about God changed. Are you going to appreciate God's love and let the Word of God about the love of the Almighty God inspire you? I pray that will be your portion in the name of Jesus. Amen.`,
      relatedSermons: [
        { id: 1, title: "HIS BANNER OVER US IS LOVE" },
        { id: 3, title: "UNBREAKABLE CHORD OF DIVINE LOVE" },
      ],
    },
    "3": {
      id: 3,
      title: "UNBREAKABLE CHORD OF DIVINE LOVE",
      category: "Journey of Love",
      date: "July 16, 2017",
      duration: "45 min",
      summary:
        "Understanding how God's love creates an unbreakable bond with us, unlike human love that can be broken. Through the parable of the prodigal son, we see that nothing can separate us from God's love.",
      keyPoints: [
        "Divine vs human love",
        "Nothing can separate us from God's love",
        "Our imperfections cannot break the divine chord",
      ],
      scripture: "Luke 15:11-32; Romans 8:38-39",
      fullScripture:
        "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/unbreakable-chord-divine-love.mp3",
      videoUrl: "/sermons/video/unbreakable-chord-divine-love.mp4",
      fullText: `# UNBREAKABLE CHORD OF DIVINE LOVE

## Introduction

I welcome you all to this special service this morning. If Jesus Christ, our Lord and Saviour tarries His second coming, may we enjoy many glorious services like this in the name of Jesus. Amen.

At the beginning of this month, our Father in heaven gave us a great theme titled, The Love of God, so that we can ponder on His love for us and appropriate the numerous promises of that divine love. Our reflections on this love of God have led us to appreciate the depth, width, length, and height of the love of God.

This morning we shall continue where we stopped two weeks ago to ponder and appreciate this love of God in a message titled, The Unbreakable Chord of Divine Love.

## Divine versus Human Love

Love has been regarded as the greatest human emotions. When there is genuine love between two people, it is without any doubt a wonderful experience. It is like an invisible strong chord or rope is binding two souls together.

There is a strong similarity between human love and divine love in the sense that there is an invisible strong bond that binds two people together, and also binds us to our loving Father. What differentiates divine love from human love is the strength of this bond. Human bond of love can be broken, divine bond is unbreakable.

However strong the chord of human love may be, it can break, and it will break! For one thing, death separates. Apart from death, two people may genuinely fall in love, get married and the whole world will say this is a marriage made in heaven, and then after a few years the union ends in divorce.

## Nothing Can Separate us From the Love of God

Paul the Apostle makes this fact very clear in his letter to the Romans by reminding his readers that nothing, meaning nobody or any situation, can separate us from the love of God:

*"For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord"* (Romans 8:38-39).

Top on this list of Paul's illustration is the fact that not even death can separate us from the love of God. Earlier, I mentioned that even with the best of human love, death is a sure separator. But when we look at it carefully in the case of divine love, death only unites us with our maker rather than separate us from His love.

## Our Imperfection Cannot Break the Divine Chord of Love

While Paul talks mainly on external factors not being able to break the chord of divine love, Jesus teaches us a deeper lesson that even internal factors, that is, our behavior and imperfections, cannot break that wonderful chord of divine love.

This fact is illustrated in the teaching of Jesus in the well known 'Parable of the Prodigal Son.' Many biblical scholars have suggested that this parable should actually be called, 'The Parable of the Loving Father' because the story illustrates the extravagant love of God for us even when through our own actions and faults we are lost.

### The Prodigal Son's Demand

Here we have a father who has two sons. The younger son suddenly decided he has had enough of the comfort and security that the home provided and wanted his father to give him his own share of his inheritance.

*"The younger one said to his father, 'Father, give me my share of the estate'"* (Luke 15:12a).

This is an outrageous demand because the culture of the Jews at that time frown seriously at such horrific demand. It is like saying, "Papa I want you dead. I can't wait for you to die." The father could have dismissed the demand and scolded him. But he did not do any of these! He simply obliged the young man. By so doing, the father preserved the chord of love between him and his son.

### The Son's Wild Living

*"So he divided his property between them. Not long after that, the younger son got together all he had, set forth for a distant country and there squandered his wealth in wild living"* (v. 12b-13).

In a sense we are all like that younger son. We are always grieving our heavenly Father through our sinful attitude of leaving His presence to do things our own way. The older brother gave us more detailed information about the wild life the younger brother lived - he was partying with women of easy virtue.

Even at that, the father's heart was always with the lost son, hoping he will come home someday. That is why when the son finally came back, it was the father who saw him first from afar.

### The Father's Response

When the prodigal son decided to return home, he prepared a well calibrated speech. But there is a big twist in the story here. It seems as if the father has been on the lookout for him right after he left home. The old man was always looking forward to the time his son will come back home.

*"But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him"* (Luke 15:20).

The father did not turn his back to a prodigal son who has given him a lot of sleepless nights. He did not give him a stern lecture on his wrongdoings. Rather, he accepted him back and clothed him without questioning. The love of the father for his son is so lavish that we can call it extravagant love.

## What Should We Do About This Unchanging Love?

Children of God, I am sure you are already appreciating the depth of this divine love and realizing that God loves you and will love you no matter what. The question I want you to ponder on this morning is what do you do with this eternal fact.

Do not take that love for granted, or worse still, try to exploit that love for selfish purpose. Our reaction should be one of gratitude for this great gift of unbreakable, unchanging and unrelenting love. It should motivate us to love God in return with all we have.

In Matthew chapter 12, verses 30-31, Jesus commanded his followers:

*"Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.' The second is this: 'Love your neighbor as yourself'"* (Matthew 12: 30-31).

## Conclusion

Children of God, as I bring this sermon to a close, love is in the air! The promises of the love of God will be yours. And so, I want us to pray this prayer together:

"Father, I thank you for the message you have sent to me today, reminding me of how much you love me. I have come to a new realization that no external 'who' or 'what' can break the chord of your divine love in my life. I appreciate the love you have for me. And I ask you to give me the grace to love you more and more with all my soul and strength. Let me be a reflecting mirror of your love to my fellow human beings. Thank you, loving Father. In the name of Jesus I pray. Amen."`,
      relatedSermons: [
        { id: 1, title: "HIS BANNER OVER US IS LOVE" },
        { id: 2, title: "DIMENSIONS OF THE LOVE OF GOD" },
      ],
    },
    "4": {
      id: 4,
      title: "INTRODUCTION: JOURNEY OF LOVE",
      category: "Journey of Love",
      date: "December 1, 2018",
      duration: "35 min",
      summary:
        "An invitation to join God's epic journey of love that began over two thousand years ago, exploring the themes of hope, peace, joy, and love in the advent season.",
      keyPoints: [
        "Advent season themes",
        "God's invitation to love",
        "Promises of salvation, redemption, and adoption",
      ],
      scripture: "John 3:16; 1 John 4:9",
      fullScripture:
        "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/introduction-journey-of-love.mp3",
      videoUrl: "/sermons/video/introduction-journey-of-love.mp4",
      fullText: `# INTRODUCTION: JOURNEY OF LOVE

## Introduction

I welcome you all in the name of our Lord and Saviour Jesus Christ to the December edition of 'Operation Declare and Decree' service. This is the last 'Operation Declare and Decree' service in the year that is gradually coming to an end. We must thank God for His faithfulness in being with His Church. Great is the faithfulness of God who has kept, protected, blessed, and guided us thus far this year.

I declare and decree that the good Lord who has been with us since the beginning of the year will be with us in this last month of the year and forever, in the name of Jesus. Amen.

## The Advent Season

By the Christian church calendar, the Advent season starts tomorrow, the second day of December and should end on Christmas eve. Thereafter, we will celebrate Christmas and be ushered into a glorious New Year.

The word advent is a Latin for 'coming or arrival.' Therefore, the Advent Season for us Christians is a period when we reflect on the greatest story of all time: the coming to the world of our Lord and Savior Jesus Christ. It is a story that is never boring to hear again and again because it is full of great themes: of Hope, of Peace, of Joy and of Love. And these, as it turns out, are the themes of the Advent Season.

I declare and decree that your situation in this new month and beyond will never be hopeless in the name of Jesus. Amen.

I declare and decree that the peace of God which passes all human understanding will be your portion, in the name of Jesus. Amen.

I declare and decree that the joy of the Lord shall define your life, and you will rejoice in this new month and beyond, in the mighty name of Jesus. Amen.

I declare and decree that the realization that God loves you will inspire you in this new month and beyond in the name of Jesus. Amen.

## The Journey of Love

When I was pondering, and asking our God, what the theme for His church for this month of December will be, the Lord revealed to me that He, the Almighty and loving Father, is inviting us to join Him in an epic journey that started more than two thousand years ago. It is a journey which millions of believers over the ages have undertaken.

The Bible records that the Shepherds, the Magi, the Angels, Simeon, Mary, Joseph, the inn keepers in Bethlehem and many more were part of the journey in the beginning. The Journey we are invited to join, which is the theme for the church for the month of December, is a Journey of Love.

The journey was initiated through grace and the love of God for His creations. It is an epic journey that is full of excitement that fires one's imagination and makes one wonder what manner of love our God has for us His creation.

## Distractions Along the Way

Like in all endeavors in the journey of life, there will be all sorts of distractions designed by Satan to make us lose our focus. For instance, as each year is coming to an end, there are always the Devil's suggestions that you have not achieved the goals you have set for yourself. Hence, what is the point of the 'Journey of Love'? Why not abandon it altogether?

There also may be financial pressures, unfulfilled aspirations, ruptured relationships and the like that may divert our attention from enjoying in full measure the benefits of being partakers in this wonderful spiritual rendezvous. I exhort you, brethren, not to focus on the challenges but to fix your eyes on Jesus our Lord and Saviour who has promised us victory.

I declare and decree that all the plans of destiny diverters in this new month and season are frustrated and their schemes scattered, in the name of Jesus. Amen.

## Three Great Promises

As we can expect, there are great promises implicit in the theme of 'Journey of Love' that God has given to us in this new month. Let us briefly touch on three of these great promises:

### First Promise: Salvation

The Bible tells us that in the manifestation of God's love through the coming of our Lord and Saviour Jesus Christ lies the precious promise of salvation:

*"This is how God showed his love among us: He sent his one and only Son into the world that we might live through him"* (1 John 4:9).

I declare and decree that as you undertake this 'Journey of Love' in this Advent season, you will experience the joy of your salvation, in the name of Jesus. Amen.

### Second Promise: Life in Christ

The promise of the love of God is that even though we were dead in sin or maybe wallowing in sin, the love of God will make us alive in Jesus Christ:

*"But because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions—it is by grace you have been saved"* (Ephesians 2:4-5).

### Third Promise: Adoption

The third promise in this 'Journey of Love' is that we are adopted now into the family of God. We are no longer alienated from God, but we have become children of God:

*"See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!"* (1 John 3:1).

Surely there are innumerable benefits that come from belonging to the family of the loving Father.

## Conclusion

As I bring this short exaltation to a close, I commit you to the hands of the loving Father who is able to keep you, preserve you and guide you in this Advent season and beyond, in the name of Jesus. Amen.

May the good Lord bless and prosper the work of your hands. May His unchanging and steadfast love comfort you, in the name of Jesus. Amen.

I declare and decree that through the love of God all will be well with you and yours in this new month and beyond. Amen.`,
      relatedSermons: [
        { id: 5, title: "THE LOVE OF GOD: PART 1" },
        { id: 6, title: "BENEFITS OF THE LOVE OF GOD" },
      ],
    },
    "5": {
      id: 5,
      title: "THE LOVE OF GOD: PART 1",
      category: "Journey of Love",
      date: "December 2, 2018",
      duration: "45 min",
      summary:
        "Understanding the biblical foundation of God's love - exploring why God is qualified to invite us on this journey and the characteristics of His unchanging love.",
      keyPoints: ["God is love", "Characteristics of divine love", "God's love demonstrated through Christ"],
      scripture: "1 John 4:7-21",
      fullScripture:
        "Whoever does not love does not know God, because God is love...God is love. Whoever lives in love lives in God, and God in them.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/love-of-god-part1.mp3",
      videoUrl: "/sermons/video/love-of-god-part1.mp4",
      fullText: `# THE LOVE OF GOD: PART 1

## Introduction

I welcome you to the combined service this morning. If Jesus tarries His second coming, may we experience and enjoy many glorious services like this in the name of Jesus. Amen.

Yesterday at the December edition of the 'Operation Declare and Decree' service, our loving Father invited us to be a participant in a Journey of Love which by His grace is the theme of His church this month. We were reminded that love is one of the four themes of the advent season, the others being hope, peace and joy.

Without a doubt, I believe we all have accepted the invitation to be part of this 'Journey of Love.' But before you join the love trail, I want each and every one of us to pause for a moment and reflect on the reason why you should accept the invitation. This is one of the key issues that the message of God this morning will be addressing in the sermon titled, The Love of God.

## God is Qualified to Invite You to The Journey of Love

Children of God, let us start by looking at how you will react to a human invitation to an event. Suppose a friend of yours whom you know very well invites you to an event with a lot of promises of what will happen at this event. Being a rational being, you are likely to filter those promises with what you know about that your friend. Can he deliver or is he just marketing the event so that you can accept his invitation?

So, I pose the question to you this morning, why should you accept the invitation from the Almighty Father to undertake a 'Journey of Love'? Or put in another question form, can God deliver on his promises of love in this journey?

Your answer to this question is likely to be "Yes, God is always faithful, and he will deliver on His promises." The other part of the answer should also be that He is capable of delivering on the promises of love because the Bible tells us that one of the attributes of God is love. God is Love, therefore He can deliver on the promises of love.

First John 4:8,16 says:

*"Whoever does not love does not know God, because God is love...God is love. Whoever lives in love lives in God, and God in them."*

## God is Love

We need to elaborate more on this declaration that God is love. The essential nature of God is love. In a sense, love permeates all the other attributes and actions of God. For instance, God's love is not in conflict with His holiness, righteousness, justice, or even His wrath. All of God's attributes are in perfect harmony.

Everything God does is loving, just as everything He does is just and right. God is just and holy. He abhors sin. But because of His essential nature which is love, even in his wrath and anger you will still see His precious love coming out so clearly. God's administration of His justice and punishment is never vindictive. More often than not, it is protective and corrective.

### Example from the Garden of Eden

Let us illustrate this point from the story of the fall of man in the Garden of Eden. First, before the fall we must remember that God created man specially after His own image (Genesis 1:27) which in itself is an act of love. But Adam and Eve disobeyed God and they had to be punished.

Even at that, the Bible tells us that the love of God remained with Adam and Eve. Before they were banished from the Garden of Eden, God graciously provided them effective clothing compared to the fig leaves they had made for themselves:

*"The Lord God made garments of skin for Adam and his wife and clothed them"* (Genesis 3:21).

In essence, even when they were being punished, God's love showed in His gracious provision for them.

## Definition of Love

Beyond showing mercy and love when He punishes, God is love because He perfectly fits the Biblical descriptions or definitions of love. One of such definitions is from the first letter of Paul to the Corinthians:

*"Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres. Love never fails"* (1 Corinthians 13: 4-8a).

As we can see, God (Love) is "patient" with us. He gives us several chances when we go astray to come back to the right relationship with Him. When we come back or repent, He receives us back unconditionally. That is to say that God "keeps no records of wrongs."

## Characteristics of the Love of God

If God is love, the next question we should ask ourselves is what the nature of God's love is. This is important because the human use of the word love is often quite different from the spiritual use. In this second part of this message, we will focus on four characteristics of the love of God to us.

### God's love is steadfast and unchanging

The first characteristic to know is that God's love is steadfast and unchanging. This is unlike the love of human for God or others which is ever so fickle. It is the nature of human love to change depending on circumstances or even mood.

Not so with God's love. The Bible tells us that God's love for us is steadfast, and unchangeable and the faithfulness of God is so great that it confounds our human logic:

*"Because of the Lord's great love we are not consumed, for his compassion never fail. They are new every morning; great is your faithfulness"* (Lam. 3:22-23).

### God's love is not carnal or natural

The second nature of the love of God is that it is not natural or carnal. That makes it amazing. With human love we are most likely to love the lovable. But not so with the love of God which is a type of love that loves the unlovable.

This fact is buttressed by the Salvation story. God demonstrated His great love for us by sending His only Son to the world to die a painful death on the Cross so that we can be redeemed from the hold of Satan and sin.

*"You see, at just the right time, when we were still powerless, Christ died for the ungodly. Very rarely will anyone die for a righteous person, though for a good person someone might possibly dare to die. But God demonstrates his own love for us in this: While we were still sinners, Christ died for us"* (Romans 5: 6-8).

### God's love is demonstrated in Jesus Christ

A closer look at the birth and the earthly mission of our Lord and Saviour Jesus Christ demonstrates the love of God for us. That famous Bible verse, John 3:16, tell us that God sent his only begotten Son to the world for our redemption. The motivation was the love that God has for us:

*"For God so loved the world that he gave his one and only Son, that whosoever believes in him shall not perish but have everlasting life"* (John 3:16).

### God's love is poured into our heart through the Holy Spirit

The final characteristic I want us to ponder on this morning is that God's love is poured into our hearts through the Holy Spirit. The Bible tells us:

*"And hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit, who has been given to us"* (Roman 5:5).

We need to pay attention to this fact because it is telling us something we can relate with when it comes to the issue of love. Human love as we know has something to do with the heart. When you are in love in the human sense, it is more of a matter of the heart rather than of the head.

What this lovely verse is telling us is similar to what we know about human love - God's love is not mainly a matter of logical inference. It is something that we experience in the heart. You know about, and experience, God's love not mainly through inference from logic but majorly through your hearts.

## Conclusion

Children of God, I do hope you can further appreciate the love of God through this message. And as I said earlier, I trust you will enthusiastically accept the invitation of God to embark on this spiritual journey called the 'Journey of Love' in this advent season.

The person inviting you is an embodiment of love. He is love. You can therefore be sure that the promises of love He offers in this rendezvous is real.`,
      relatedSermons: [
        { id: 4, title: "INTRODUCTION: JOURNEY OF LOVE" },
        { id: 6, title: "BENEFITS OF THE LOVE OF GOD" },
      ],
    },
    "6": {
      id: 6,
      title: "BENEFITS OF THE LOVE OF GOD",
      category: "Journey of Love",
      date: "December 9, 2018",
      duration: "48 min",
      summary:
        "Exploring the tangible benefits of God's love including salvation, redemption, forgiveness, and adoption into God's family. Understanding what it means to be co-heirs with Christ.",
      keyPoints: ["Salvation through God's love", "Redemption and forgiveness of sin", "Adoption into God's family"],
      scripture: "1 John 3:1-11",
      fullScripture:
        "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/benefits-of-love-of-god.mp3",
      videoUrl: "/sermons/video/benefits-of-love-of-god.mp4",
      fullText: `# BENEFITS OF THE LOVE OF GOD

## Introduction

I welcome you to the first service this morning. If Jesus tarries His second coming, may we experience and enjoy many glorious services like this in the name of Jesus. Amen.

Last week in the combined service we were challenged to reflect on why we accepted God's gracious invitation to embark on the 'Journey of Love' in this advent season. This made us examine a key attribute of God - Love. We were reminded that the Bible tells us that God is love.

The other day I was reading an article about love. And the article starts by saying that falling in love is a feeling like no other. It talks about that familiar feeling of stars in the eyes, butterflies in your stomach and weakness in the knees. The article goes further to say that being in love actually has tangible health benefits for both your body and mind.

If that is the case in the physical realm, then we should expect that in the spiritual realm there must be 'Benefits of the love of God.' which is the title of the sermon this morning.

## The Ultimate Benefit

The ultimate benefit of God's love is enjoying God. If you believe that the benefits of God's love and being in love with God are to have a big house, become rich, have a good marriage, have children and so on and so forth, you may be very correct. After all, the Bible tells us that God's plans for you is "to prosper you and not to harm you, plans to give you hope and a future" (Jeremiah 29:11).

But if that is all to what you believe about the benefits from the love of God, then I am afraid you do not know what it is to be loved by God. Children of God, the ultimate benefit of God's love is for you to live a life you ought to live in Christ while you are here on earth and come home to God where you will see Him and enjoy with Him forever and ever.

## Three Major Benefits

Now, let us look in-depth at the benefits of God's love:

### 1. Salvation is a gracious benefit arising from God's love

The first benefit of God's love towards you is the salvation of your soul. The Bible states unequivocally in the gospel and in the epistle of John:

*"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life"* (John 3:16).

*"This is how God showed his love among us: He sent his one and only Son into the world that we might live through him"* (1 John 4:9).

One of the key benefits of God's love is the fact that God wants you to be alive through Jesus. Unless we live in Christ and through Christ in this world, you will only exist - that is, you will only go through the motion of living but never live to your full potential.

This is a great benefit because, as the Bible reminds us, it is a very bad bargain indeed when you receive all the world has to offer only to end up spending eternity in the lake of fire:

*"What good will it be for someone to gain the whole world, yet forfeit their soul? Or what can anyone give in exchange for their soul?"* (Matthew 16:26).

### 2. Benefit of Redemption and Forgiveness of Sin

The second benefit is related to the first one. Because of the love God has for us His creatures, humanity has been rescued from the clutches of Satan and sin. To be certain, we have found ourselves in the camp of Satan due to our fault - our sins.

Right from the fall of Adam and Eve, humanity had progressively been alienated from God because of sin. We needed someone higher to pay a ransom to set us free from our slavery to sin and our death sentence on account of our sins. The ransom price to free us from slavery and bondage is Christ's own blood, offered freely, offered willingly, offered lovingly for our sins. This process is called redemption.

Related to the redemption is the forgiveness we received through the blood of Jesus making atonement for our sin on the cross of Calvary. The wonder of this forgiveness is that the sacrifice offered on the cross was once and for all, which took care of past, present and future sins:

*"The death he died, he died to sin once for all; but the life he lives, he lives to God"* (Romans 6:10).

*"And by that will, we have been made holy through the sacrifice of the body of Jesus Christ once for all"* (Hebrews 10:10).

### 3. Benefit of the adoption into the family of God

A third benefit is that the love of God makes you an adopted member of the family of God:

*"See how very much our Father loves us, for he calls us his children, and that is what we are! But the people who belong to this world don't recognize that we are God's children because they don't know him"* (1 John 3:1 NLT).

But you might ask, are we not all God's children since He created us? Yes, you are right in the sense of paternity. But do not forget that at some time, humanity constitutes itself into a set of creatures in rebellion against God. Then we lost the fatherhood of God.

Now, through the earthly mission of our Lord and Saviour Jesus Christ, we are reconciled and adopted back into the family of God through faith.

This adoption is profound and goes beyond the legal transfer of fatherhood as you will find in the case of earthly adoption. In the case of the adoption by God, He also changes you on adoption and regenerates you to be a new creature.

## Specific Benefits of Adoption

Let us now turn our attention to specific benefits of this adoption into God's family:

### (a) Relationship with God, the good and loving Father

The first specific benefit that comes from being adopted into the family of God is that we can now relate to God as the loving Father. You can come to Him in supplications and prayers and present to Him your concerns, challenges and aspirations.

*"Which of you, if your son asks for bread, will give him a stone? Or if he asks for a fish, will give him a snake? If you then, though you are evil, know how to give good gifts to your children, how much more will your Father in heaven give good gifts to those who ask him!"* (Matthew 7:9-11).

### (b) Led by the Holy Spirit

The second benefit from being a child of God arising from our adoption into Gods family is that you will be led by the Holy Spirit. You will no longer lead a carnal life which invariably leads to spiritual death, confusion and chaos.

*"For those who are led by the Spirit of God are the children of God. The Spirit you received does not make you slaves, so that you live in fear again; rather, the Spirit you received brought about our adoption to sonship. And by him we cry, 'Abba, Father.' The Spirit himself testifies with our spirit that we are God's children"* (Romans 8:14-16).

### (c) Joint Heirs with Christ

By being God's child, the third benefit you get is that you have full rights to receive His inheritance. The Bible tells us that Jesus is the only begotten Son of God. Hence, once adopted as a child, you become co-heirs/joint heirs with Jesus, our Lord and Saviour.

*"So you are no longer a slave, but God's child; and since you are his child, God has made you also an heir"* (Galatians 4:7).

*"The Spirit himself testifies with our spirit that we are God's children. Now if we are children, then we are heirs - heirs of God and co-heirs with Christ, if indeed we share in his sufferings in order that we may also share in his glory"* (Romans 8:16-17).

## Conclusion

As I bring this message to a close, I want you to remember the great benefits we have from God's love and being in love with God. The benefits are innumerable and so great that you should all the days of your live be in gratitude for this wonderful grace that God has bestowed on you.

The Psalmist tells us to "Praise the Lord...forget not all his benefits" (Psalm 103:2). I exhort you brethren to renew your life of praise. Be grateful to God in all situations and for everything, relying on His love.

In this advent season you are not only going to have that feeling of stars in your eyes as a result of the love you have for God, you are also going to see a star that will guide you in your journey in life. The 'Star of Bethlehem' guided the Magi to Bethlehem where they met baby Jesus. May that star guide you so that you will always be in the presence of Jesus worshipping Him all the days of your life. And so shall it be in the name of Jesus. Amen.`,
      relatedSermons: [
        { id: 5, title: "THE LOVE OF GOD: PART 1" },
        { id: 7, title: "CHRISTMAS REFLECTIONS ON THE LOVE OF GOD" },
      ],
    },
    "7": {
      id: 7,
      title: "CHRISTMAS REFLECTIONS ON THE LOVE OF GOD",
      category: "Journey of Love",
      date: "December 24, 2018",
      duration: "38 min",
      summary:
        "Christmas Eve reflections on how God's love was manifested through the incarnation of Jesus Christ and its implications for believers today.",
      keyPoints: ["Christmas and incarnation", "God's love in action", "From darkness to light"],
      scripture: "John 3:16; 1 John 4:9",
      fullScripture:
        "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      hasAudio: true,
      hasVideo: false,
      hasText: true,
      audioUrl: "/sermons/audio/christmas-reflections-love-of-god.mp3",
      videoUrl: "",
      fullText: `# CHRISTMAS REFLECTIONS ON THE LOVE OF GOD

## Introduction

Good morning church. I am delighted to see you in church. I welcome you in the name of our Lord and Saviour Jesus Christ. I can see that we are all in festive mood as today is Christmas eve. Therefore, this is not the time for lengthy teachings about the theology of Christmas.

About three weeks ago, during the Operation Declare and Decree service, I mentioned to you that the Advent season had begun. Now we are right at the end of the season. This morning, we shall reflect on the birth of our Lord and Saviour Jesus. Specifically, our reflection will focus on the love of God. The message is titled, 'Christmas Reflections on the Love of God.'

## Background

Let us start the exhortation this morning by reminding ourselves of a major fact about Christmas. It is an important celebration, an event for the whole world irrespective of religion or nationality. Simply put, the world dates events and history majorly by the birth of Christ. History is dated BC, meaning 'Before Christ,' and A.D. which stands for Anno Domini and is a label for numbering years after Jesus Christ was born.

Another background fact that I want to also bring to your attention is the fact that the history and evolution of Christmas has evolved over time. On the night Jesus was born something spectacular took place. The village of Bethlehem had the most spectacular sound-and-light shows in human history. The very first Christmas carol was sung and there was a visible divine radiance.

If we fast forward to our time about two thousand plus years later, we still have the tradition of sound-and-light in form of Christmas carols and decorations. But all in all, they are pale in comparison to what the shepherd and those in their environment saw on that first Christmas.

## The Date of Christmas

Somewhere along the way between that first Christmas and now, the date of the birth of Christ was changed by man, actually by the Roman Catholic Church. The truth of the matter is that even though we celebrate Christmas on the 25th of December, the internal evidence from the Bible shows that Jesus was born sometime in the month of September or October.

The adoption of December 25th as the birth of our Lord and Saviour Jesus has an interesting story. In the first four centuries in Europe, there was this annual pagan fertility custom celebration held for a few days starting December 25th. One aspect of this fertility celebration is the worship of the Sun as a god.

In 595 A.D, Pope Gregory sent a missionary called Augustine to England to lead a mission to convert the pagan Anglo-Saxons to the Christian faith. Despite his best efforts, however, the people would not be weaned off this indulgent festival of worshiping the Sun.

So Augustine asked Pope Gregory, "What can I do about it?" Pope Gregory virtually said, "If you can't beat them, join them." The Pope instructed Augustine to turn the pagan activities 180 degrees and make them Christian. This was how December 25th was then adopted as the official birthday of Jesus Christ.

Now you know that anybody who challenges you that Christmas is a pagan worship activity is only trying to twist history. Yes, December 25th was the day the pagan Anglo-Saxon started their annual fertility custom activities, but the Church turned the negative to positive.

What we are celebrating on Christmas is God's intervention in the history of man by sending His only begotten Son on a Salvation mission:

*"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life"* (John 3:16).

From this very famous Bible verse we can see clearly that the divine intervention of Jesus through His birth and Ministry on earth was motivated by the great love of God.

## Incarnation

In order for us to appreciate this love, I need to point out that the birth of Jesus into this world is also a key doctrine of the church. It is called incarnation - God became flesh. It is very easy to ignore the stunning reality that Christmas is really about the incarnation of Jesus.

Let me briefly explain the need for, and the wonder of, incarnation. Why should Jesus, the second person in the Trinity, lay aside His position in heaven, a place where there is continuous praise and perpetual peace, for a dying and corrupt world as ours?

The short answer is that ever since man lost the direct fellowship with God in the Garden of Eden, all efforts through the prophets' sign and wonders that were sent to reconcile man to God failed because of our carnal nature. Thus the gulf between God and man grew wider and wider.

As the gulf widened, the perception of man about God got more distorted and far away from the truth. Some in this period saw God as an impersonal force, a deity which cannot have anything to do with creatures. God was also seen as a stern, capricious being competing with man.

To be sure, God has given man partial but certain revelation about Himself through His work in nature, which man often ignores. For example, when you study Astronomy, you will know that our earth is just one tiny ball in the zillions of terrestrial balls all moving in the same paths and pattern over the ages. This tells you that there is God who is orderly and not a God of chaos.

Despite these facts revealed to man over the ages, many still have wrong view about our God. Therefore, at the appointed time, God decided to drive home the truth about Himself. Since the messages sent through prophets, and the evidence found in nature, had failed to change man, God decided on incarnation.

In other words, out of His love for man, He came down to our level so that we may first and foremost know the truth. When Jesus was before Pilate, He mentioned that one of the objectives of His mission was to let man know the truth about God:

*"You are a king, then!" said Pilate. Jesus answered, "You say that I am a king. In fact, the reason I was born and came into the world is to testify to the truth. Everyone on the side of truth listens to me"* (John 18:37).

The partial revelation of God through the work of nature and His prophets proved not enough to fully revealed the truth about God. We need more; the full revelation about God is seen in Jesus. When you see and know Jesus, then you know God.

*"No one has ever seen God, but the one and only Son, who is himself God and is in closest relationship with the Father, has made him known"* (John 1:18).

What this means is that as you celebrate Christmas, as we enjoy Christmas carols, do our shopping, accept and give gifts, we must be conscious of the fact that the process of getting humanity, and by inference you, out of darkness into light started on that first Christmas day.

## Conclusion

As we go home this Christmas day, I beseech you to reflect on the love of God that made the second person in the Trinity become poor just for your sake so that you may become rich. I want you to know that you are so privileged as you are part of the cast in the greatest story ever told. This is all because of God's love for you.

In accordance with the inspired theme for our Church this last month of the year, we embarked on a 'Journey of Love' this advent season. In reality, that 'Journey of Love' has been on for generations before us when baby Jesus was born in a manger in Bethlehem. The journey will continue for a long time to come if Jesus tarries His second coming.

Merry Christmas to you all and wishing you a prosperous New Year ahead. Amen.`,
      relatedSermons: [
        { id: 6, title: "BENEFITS OF THE LOVE OF GOD" },
        { id: 8, title: "HE BECAME POOR SO THAT WE MAY BE RICH" },
      ],
    },
    "8": {
      id: 8,
      title: "HE BECAME POOR SO THAT WE MAY BE RICH",
      category: "Journey of Love",
      date: "December 25, 2018",
      duration: "35 min",
      summary:
        "Christmas Day message exploring the incarnation - what it cost Jesus to become human and the seven spiritual riches we receive through His poverty including salvation, eternal life, and adoption.",
      keyPoints: [
        "Cost of incarnation for Jesus",
        "Seven benefits of Christ's poverty",
        "True spiritual riches vs material wealth",
      ],
      scripture: "2 Corinthians 8:1-9",
      fullScripture:
        "For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor, so that you through his poverty might become rich.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/he-became-poor-we-may-be-rich.mp3",
      videoUrl: "/sermons/video/he-became-poor-we-may-be-rich.mp4",
      fullText: `# HE BECAME POOR SO THAT WE MAY BE RICH

## Introduction

I welcome you to this year Christmas service and pray that the joy of Christmas will be with you today in the name of Jesus. We thank God for making us see another Christmas. And if Jesus delays His second coming, may we enjoy more glorious Christmas in the name of Jesus. Amen.

This morning I have prepared a short exhortation titled, He Became Poor so that We May Be Rich. The essence of this exhortation is to remind us again and again how privileged we are that Jesus came into the world. We have said it so often that the intervention of Jesus through His birth and Ministry on earth was motivated by the great love of God as we are told in John 3:16.

We will look briefly at what the incarnation of Jesus means to Him and what it portends for us. Thereafter, I believe your heart should be full of eternal gratitude for this manner of love shown to you and me by our Lord and Saviour.

## Incarnation a Central Christian Doctrine

There are many lovely strands in the story about the birth of Jesus Christ, mainly in the accounts of the gospels according to Matthew and Luke: the angelic visit to young Mary, the star that guided the Magi from the east, the unusual submission and obedience of Joseph, the shepherd on the field, the birth in the manger as there was no room in the inn, and so on and so forth.

In the midst of these lovely stories, it is very easy to ignore the stunning reality that Christmas is really about the incarnation of Jesus. In the birth of our Lord and Saviour Jesus Christ, we have God assume a human nature and became a man in the form of Jesus Christ. Together with the resurrection of Jesus, incarnation, that is God became flesh, is a central Christian doctrine.

## What is the implication of Incarnation for Jesus

Paul in his second Epistle to the Corinthians, chapter 8, verse 9, summarizes very clearly and simply the implications of incarnation for Jesus, or the cost of Christmas:

*"For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor...."* (2 Corinthians 8:9a).

In effect, the birth of Jesus should remind us that our rich Saviour became poor for our sake. In what sense did Jesus become poor, you might ask?

Jesus, as the second person in the Trinity, laid aside His position in heaven, a place where there is continuous praise and perpetual peace, and a place where the angels and heavenly hosts worship Him for a dying and corrupt world. To make matter more contrasting, even if the Lord of Lords will condescend to be with His creatures, you will expect the King of Kings to be born in the best facility there was at that time.

Not so! Jesus was born in the lowliest place - a stable (where animals are kept) as there was no guest room available at the inn. He was so rich, yet for our sake He became poor and had to be born in a stable, "wrapped in cloths and placed in a manger":

*"While they were there, the time came for the baby to be born, and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them"* (Luke 2: 6-7).

He was, and still is, being worshiped by angelic and heavenly hosts. Yet when He came to this world He was rejected, despised, hounded and killed him like a common criminal on a Cross.

*"Who, being in very nature God, did not consider equality with God something to be used to his own advantage; rather, he made himself nothing by taking the very nature of a servant, being made in human likeness. And being found in appearance as a man, he humbled himself by becoming obedient to death - even death on a cross!"* (Philippians 2:6-7).

## Why Did He Make Himself Poor?

Jesus who is so rich in splendor and glory that we cannot even begin to describe His riches with human vocabulary, became poor simply 'for our sake.' This shows the extreme and intense love that God has for us, to say the least.

When we look at the birth and mission of our Lord and Saviour Jesus Christ here on earth, we discover that everything he did is for us:

- He left heaven so that you can go to heaven.
- He taught His eternal truths so that you may not live in ignorance.
- He performed miracles so that you can appropriate the power of God.
- He was rejected so that you will never be rejected.
- He was born in the lowliest place so that you can be born of the Holy Spirit.
- He became a servant so that you can learn life's greatest lesson and a become saint.
- He died on the Cross so that you can live with him eternity.

## What is the implication of incarnation for you?

We now come to the second part of this spiritual 'simultaneous equation'. What is the implication of Christmas or incarnation for you? With what we have mentioned above, it becomes clear that the implication of the birth of Christ for you is...so that you through his poverty might become rich (2 Corinthians 8:9b).

This is a great and profound spiritual truth. Jesus Christ came into this world and became poor so that you can be rich through His poverty. So, one major lesson of Christmas is to make us realize the depth of the love of God; He will do anything and everything so that we might become rich.

Brethren I do not want you to be ignorant of this spiritual fact. The richness being talked about here goes far beyond material wealth. True, Christ came so that we can have life and have it more abundantly (John 10:10b). But the riches the Bible talks about here in this verse is deeper and more fulfilling than worldly possession of goods.

## Seven Benefits of Incarnation

It comes as a result of the seven benefits God gives you as a result of incarnation or birth of Jesus:

### i. The benefit of Salvation:
*"This is how God showed his love among us: He sent his one and only Son into the world that we might live through him"* (1 John 4:9).

### ii. The benefit of eternal life:
*"For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord"* (Rom.6:23).

### iii. The benefit of adoption:
*"See what great love the Father has lavished on us, that we should be called children of God! And that is what we are! The reason the world does not know us is that it did not know him"* (1 John 3:1).

### iv. The benefit of Holy Spirit:
*"And hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit, who has been given to us"* (Romans 5:5).

### v. The benefit of righteousness:
*"For if, by the trespass of the one man, death reigned through that one man, how much more will those who receive God's abundant provision of grace and of the gift of righteousness reign in life through the one man, Jesus Christ!"* (Romans5:17-18).

### vi. The benefit of peace:
*"Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid"* (John 14:27).

### vii. The benefit of victory over death:
*"The sting of death is sin, and the power of sin is the law. But thanks be to God! He gives us the victory through our Lord Jesus Christ"* (1 Cor15:56-57).

## Conclusion

Children of God as we go home this Christmas day, I beseech you to reflect on the love of God that made the second person in the Trinity become poor just for your sake so that you may become rich. I want you to know that you are so privileged as you are part of the cast in the greatest story ever told. This is all because of God's love for you.

Yes, in accordance with the inspired theme for our Church this last month of the year that is gradually coming to a close, we embarked on a 'Journey of Love' this advent season which ended yesterday. In reality, that 'Journey of Love' has been on for generations before us when baby Jesus was born in a manger in Bethlehem. The journey will continue for a long time to come if Jesus tarries His second coming. So, for all of us on this Christmas day, we have only stopped to briefly reflect and ponder on this wonderful love God has for us. Thereafter, the journey continues.

Merry Christmas to you all and wishing you a prosperous New Year ahead. Amen.`,
      relatedSermons: [
        { id: 7, title: "CHRISTMAS REFLECTIONS ON THE LOVE OF GOD" },
        { id: 9, title: "LOVING GOD MORE" },
      ],
    },
    "9": {
      id: 9,
      title: "LOVING GOD MORE",
      category: "Journey of Love",
      date: "December 30, 2018",
      duration: "50 min",
      summary:
        "The final message in the Journey of Love series, exploring our responsibility to love God in return and practical ways to grow in our love for Him through the Holy Spirit, prayer, and fellowship.",
      keyPoints: ["Our responsibility to love God", "How to grow in love for God", "Role of Holy Spirit in loving God"],
      scripture: "Matthew 22:34-40",
      fullScripture:
        "Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment.",
      hasAudio: true,
      hasVideo: true,
      hasText: true,
      audioUrl: "/sermons/audio/loving-god-more.mp3",
      videoUrl: "/sermons/video/loving-god-more.mp4",
      fullText: `# LOVING GOD MORE

## Introduction

I welcome you to the first service this morning. If Jesus tarries His second coming, may we experience and enjoy many glorious services like this in the name of Jesus. Amen.

Today is the last Sunday in the year that is coming to an end in less than 40 hours. Hence, today's service is extra special as it precedes the Cross Over service we are going to have tomorrow. The good Lord that started the year with us and has been with us throughout the year will see us through to the New Year in the name of Jesus. Amen.

Just to remind us, the theme of this month is still 'Journey of Love,' and this will be the last sermon in that series. I pray that God will continuously give us understanding of His word and that we will be hearers of the word and doers of His precepts in the name of Jesus. Amen.

## Review of the Journey

So far in this month's sermon series, we have so far looked at love as a key attribute of God. We were reminded of biblical fact that God is love. This fact more than qualifies God to invite us on this lifelong 'Journey of Love,' and all of us enthusiastically accepted the invitation and have embarked on the rendezvous.

Furthermore, we were reminded of the characteristics of divine love such as:
- It is steadfast and unchanging,
- It is not carnal or natural, and
- It is poured into our hearts through the Holy Spirit.

Subsequently we looked through the amazing benefits we get as privileged people from the love of God. Such benefits include salvation, redemption and forgiveness, and adoption into the family of God.

## The Greatest Commandment

Today's message takes off from one of those responsibilities that we have mentioned above, and that is, Loving God. Loving God is one of the major precepts of God in both the Old Testament and the New Testament. As a matter of fact, Jesus teaches us that loving God is the first and greatest commandment:

*"Teacher, which is the greatest commandment in the Law? Jesus replied, 'Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself. All the Law and the Prophets hang on these two commandments'"* (Matthew 22:36-40).

It is also mentioned in the instruction God gave to His chosen race:

*"Hear, O Israel: The Lord our God, the Lord is one. Love the Lord your God with all your heart and with all your soul and with all your strength. These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up"* (Deu. 6:4-7).

## Our Imperfect Love

In spite of the fact that this commandment is clear enough, our love for God has been less that perfect. Human beings throughout the ages have not loved God the way we should. Humanity's love for God has been tepid and fickle at times.

A look at the Old Testament will lead us to the simple conclusion that the story of the children of Israel is one long love story with a lot of twists and turns. God chose the Israelites as His own people and expressed his love for them continuously and faithfully throughout their very checkered history.

*"The Lord appeared to us in the past, saying: 'I have loved you with an everlasting love; I have drawn you with unfailing kindness'"* (Jeremiah 31:3).

Despite God's unfailing faithfulness, the Israelites rather than responding to this great love by loving God in return, many times turned their backs on God. Repeatedly they even went after and worship false gods.

The same situation repeats itself in the New Testament. Here we have the image of and symbolism of marriage between Christ and the church - the body of believers. Despite that, you will notice in the New Testament many cases of followers of Christ falling out of love. Jesus knew about the fickleness of the love of man for God; that is why he warned his disciples that the hearts of many would grow cold (Matthew 24:12).

## Growing in Love for God

However, brethren, we should not throw our hands up in despair and frustration and give up about loving God or use this fact as an excuse not to desire and do all we can to love God the way the Scriptures say we should.

The perspective we should take is that we should have a growing love for God. Every day our affection for Jesus should increase and the love becomes perfect when we meet our Lord and Saviour in heaven. In effect, loving God more is necessarily a logical consequence of our spiritual growth.

## How do I get to love God more?

Brethren, our desire and goal in our spiritual walk with God should therefore be to want to love Jesus more. We will do very well to learn from the Scriptures how we can do this.

But before we get to that, we must understand one crucial point in the dynamics of the love of God for us. We can love God only "because He first loved us" (1 John 4:19).

First, we must know that once we accept Christ, God poured His love into our hearts through the Holy Spirit:

*"And hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit, who has been given to us"* (Romans 5:5).

Secondly, as we know the indwelling of the Holy Spirit produces in us the fruit of love amongst others:

*"But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law"* (Galatians 5:22-23).

Therefore, the dynamics is simple and clear. God loves us and makes that love felt in our hearts through the Holy Spirit. The indwelling of the Holy Spirit in turn produces the fruit of love which makes us love God and our fellow human beings in return.

## Practical Steps to Love God More

### We need the Holy Spirit to love Jesus more

With the understanding of the dynamics of love of God and loving God, we should marvel again and again at the extent to which God goes to make us what we ought to be. The lesson here is that we need the Holy Spirit to be able to grow in our love for Jesus. Therefore, we will do well to make efforts to:

- understand the role and function of the Holy Spirit.
- pray all the time for the in-filling of the Holy spirit.
- live a godly lifestyle that avoids actions and conducts that grieve or quench the Holy Spirit.

### We need to be in the presence of God

We also need to be in the presence of God all the time so that our love for Him can grow. As an illustration, when two people are genuinely in love with each other, they will always find a way to be and enjoy each other's company.

When we want the love for God to increase, we must covet every and all opportunity to be in his presences. No excuses will do to justify why we are too busy and have no time to enjoy the loving presence of the Lord.

We must develop the attitude similar to that of Moses who will not embark on any assignment no matter who sent him unless the presence of the Lord was with him:

*"The Lord replied, 'My Presence will go with you, and I will give you rest.' Then Moses said to him, 'If your Presence does not go with us, do not send us up from here'"* (Exodus 33: 14-15).

### We need to communicate constantly with God through prayers

Relationship experts tell us that maintaining a loving relationship requires open and unscripted communication between partners. So also it is when we want our love of God to increase. We must constantly through prayer and supplication communicate with our loving Father.

Brethren we must internalize the fact that we are talking with a heavenly Father who has our best interests at heart. Hence our prayer must be intimate and fervent.

### We need to ponder on the love of God in the light of His goodness

In the last month of this year we have been hearing messages about the love of God for us, and now we are hearing about our love for God. Meditating, pondering and reflecting on what we have learnt so far should make us know more about this great love and endear God more to our hearts.

How will our hearts not be filled with gratitude when we learn about the depth, width, breadth and height of the love of God, not in a theoretical sense but in the everyday goodness that we enjoy from Him.

### We need to study the Bible

Without doubt, we need to read and study the Bible to increase our knowledge about the love of God. The Bible will illuminate, inform, teach us about what our reactions to the love of God should be. It will correct our errors and mistaken ideas that we may have picked up in the world.

### We need to associate with those who love God

Lastly, if we desire to love God more, we must associate ourselves most with those who love God. We must at all times avoid company of scoffers and cynics who are in the habit of saying uncomplimentary things about God and the things of God.

When we keep company of those who are ever ready to speak about Christ and for Christ, then we will be encouraging each other in love to love our God more.

## Conclusion

As I bring this message to a close, we want to restate the essence of today's message. This is to let us realize that the love that our God has for us places on us a responsibility to love Him back.

The responsibility to love God the way we should seems an enormous task for us in our world where we have to contend with various other matters competing for our attention and affection. We are however encouraged because God has in-dwelt us with the Holy Spirit which allows the love of God to blossom in our hearts.

Our love for God should be an ever growing one which will reach full measure when we meet our Lord and Saviour Jesus in heaven. Hence, we should do all we can to set our affection on God every moment in our 'Journey of Love' here on earth. And so shall it be in the name of Jesus. Amen.`,
      relatedSermons: [
        { id: 8, title: "HE BECAME POOR SO THAT WE MAY BE RICH" },
        { id: 1, title: "HIS BANNER OVER US IS LOVE" },
      ],
    },
  }

  return sermons[id as keyof typeof sermons] || null
}

// Helper function to get theme navigation
const getThemeNavigation = (sermonId: number, category: string) => {
  const theme = themes[category as keyof typeof themes]
  if (!theme) return { previous: null, next: null, currentIndex: -1 }

  const currentIndex = theme.sermons.findIndex((s) => s.id === sermonId)
  const previous = currentIndex > 0 ? theme.sermons[currentIndex - 1] : null
  const next = currentIndex < theme.sermons.length - 1 ? theme.sermons[currentIndex + 1] : null

  return { previous, next, currentIndex }
}

// Mock comments data
const mockComments = [
  {
    id: 1,
    name: "Grace Adebayo",
    email: "grace@example.com",
    comment:
      "This sermon was truly powerful! The teaching on God's love has transformed my understanding of His character. Thank you Pastor Anthony for this biblical foundation.",
    date: "December 16, 2024",
    time: "2:30 PM",
  },
  {
    id: 2,
    name: "Samuel Okafor",
    email: "samuel@example.com",
    comment:
      "Praise God! I've been struggling with understanding the depth of God's love. This message clarified so much for me. The Journey of Love series is life-changing.",
    date: "December 16, 2024",
    time: "4:15 PM",
  },
  {
    id: 3,
    name: "Mary Johnson",
    email: "mary@example.com",
    comment:
      "The practical applications shared in this sermon are transformative. I've started experiencing God's love in new ways and my relationship with Him has deepened. Glory to God!",
    date: "December 17, 2024",
    time: "9:45 AM",
  },
]

export default function SermonViewPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<"text" | "video" | "audio">("text")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const resolvedParams = use(params)
  const sermonId = Number.parseInt(resolvedParams.id)
  const sermon = getSermonById(resolvedParams.id)
  const themeNavigation = sermon
    ? getThemeNavigation(sermon.id, sermon.category)
    : { previous: null, next: null, currentIndex: -1 }
  const currentTheme = sermon ? themes[sermon.category as keyof typeof themes] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [resolvedParams.id])

  useEffect(() => {
    // Set default tab to text
    if (sermon) {
      if (sermon.hasText) setActiveTab("text")
      else if (sermon.hasVideo) setActiveTab("video")
      else if (sermon.hasAudio) setActiveTab("audio")
    }
  }, [sermon])

  if (!sermon) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-8 sm:py-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Sermon Not Found</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">The sermon you're looking for doesn't exist.</p>
          <Link href="/sermons">
            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Sermons
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const togglePlayPause = () => {
    const media = activeTab === "video" ? videoRef.current : audioRef.current
    if (media) {
      if (isPlaying) {
        media.pause()
      } else {
        media.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    const media = activeTab === "video" ? videoRef.current : audioRef.current
    if (media) {
      setCurrentTime(media.currentTime)
      setDuration(media.duration || 0)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = activeTab === "video" ? videoRef.current : audioRef.current
    const newTime = Number.parseFloat(e.target.value)
    if (media) {
      media.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    const media = activeTab === "video" ? videoRef.current : audioRef.current
    if (media) {
      media.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon.title,
          text: sermon.summary,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const comment = {
      id: comments.length + 1,
      name: newComment.name,
      email: newComment.email,
      comment: newComment.comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    }

    setComments([...comments, comment])
    setNewComment({ name: "", email: "", comment: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewComment((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-4 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link href="/sermons">
            <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white bg-transparent text-sm sm:text-base px-3 sm:px-4 py-2">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Sermons
            </Button>
          </Link>
        </div>

        {/* Sermon Header */}
        <div className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <span className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold mb-3 sm:mb-4 inline-block">
                {sermon.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{sermon.title}</h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {sermon.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {sermon.duration}
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-3 sm:mb-4">{sermon.summary}</p>

              <div className="mb-3 sm:mb-4">
                <p className="font-bold text-xs sm:text-sm mb-2">SCRIPTURE REFERENCE:</p>
                <p className="text-xs sm:text-sm italic">
                  "{sermon.fullScripture}" - {sermon.scripture}
                </p>
              </div>
            </div>

            <div className="flex gap-2 lg:flex-col lg:gap-3">
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-2 border-black hover:bg-gray-100 bg-transparent px-3 sm:px-4 py-2"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline ml-2">Share</span>
              </Button>
              <Button variant="outline" className="border-2 border-black hover:bg-gray-100 bg-transparent px-3 sm:px-4 py-2">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline ml-2">Download</span>
              </Button>
            </div>
          </div>

          {/* Key Points */}
          <div className="border-t-2 border-black pt-4 sm:pt-6">
            <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">KEY POINTS:</h3>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs sm:text-sm">
              {sermon.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Media Tabs */}
        <div className="border-2 border-black bg-white mb-6 sm:mb-8">
          <div className="border-b-2 border-black">
            <div className="flex flex-wrap">
              {sermon.hasText && (
                <button
                  onClick={() => {
                    setActiveTab("text")
                    setIsPlaying(false)
                    if (videoRef.current) videoRef.current.pause()
                    if (audioRef.current) audioRef.current.pause()
                  }}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm border-r-2 border-black transition-colors flex-1 sm:flex-none justify-center sm:justify-start ${
                    activeTab === "text" ? "bg-red-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  TEXT
                </button>
              )}
              {sermon.hasVideo && (
                <button
                  onClick={() => {
                    setActiveTab("video")
                    setIsPlaying(false)
                    if (audioRef.current) audioRef.current.pause()
                  }}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm ${sermon.hasAudio ? "border-r-2 border-black" : ""} transition-colors flex-1 sm:flex-none justify-center sm:justify-start ${
                    activeTab === "video" ? "bg-red-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                  VIDEO
                </button>
              )}
              {sermon.hasAudio && (
                <button
                  onClick={() => {
                    setActiveTab("audio")
                    setIsPlaying(false)
                    if (videoRef.current) videoRef.current.pause()
                  }}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm transition-colors flex-1 sm:flex-none justify-center sm:justify-start ${
                    activeTab === "audio" ? "bg-red-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Headphones className="w-3 h-3 sm:w-4 sm:h-4" />
                  AUDIO
                </button>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Text Content */}
            {activeTab === "text" && sermon.hasText && (
              <div className="prose prose-sm sm:prose-lg max-w-none">
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    <h3 className="text-base sm:text-lg font-bold">Full Sermon Text</h3>
                  </div>
                  <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">{sermon.fullText}</div>
                </div>
              </div>
            )}

            {/* Video Player */}
            {activeTab === "video" && sermon.hasVideo && (
              <div className="space-y-3 sm:space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full aspect-video"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    poster="/placeholder.svg?height=400&width=800&text=Video+Player"
                  >
                    <source src={sermon.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video Controls */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <Button
                      onClick={togglePlayPause}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
                    >
                      {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
                      <span className="ml-2">{isPlaying ? "PAUSE" : "PLAY"}</span>
                    </Button>

                    <div className="flex-1 flex items-center gap-2 sm:gap-3">
                      <span className="text-xs font-mono whitespace-nowrap">{formatTime(currentTime)}</span>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1"
                      />
                      <span className="text-xs font-mono whitespace-nowrap">{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 sm:w-24"
                    />
                    <span className="text-xs w-8">{Math.round(volume * 100)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Audio Player */}
            {activeTab === "audio" && sermon.hasAudio && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center py-8 sm:py-12 bg-gray-100 rounded-lg">
                  <Headphones className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Audio Sermon</h3>
                  <p className="text-sm sm:text-base text-gray-600">Listen to the full sermon audio</p>
                </div>

                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="hidden"
                >
                  <source src={sermon.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                {/* Audio Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Button onClick={togglePlayPause} className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                      {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
                      {isPlaying ? "PAUSE" : "PLAY"}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm font-mono w-12 sm:w-16">{formatTime(currentTime)}</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max={duration || 0}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-mono w-12 sm:w-16">{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 sm:w-32"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Theme Navigation */}
        {currentTheme && (themeNavigation.previous || themeNavigation.next) && (
          <div className="border-2 border-black bg-white p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b-2 border-black pb-2">THEME NAVIGATION</h2>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {themeNavigation.previous && (
                <Link href={`/sermons/${themeNavigation.previous.id}`}>
                  <Card className="border-2 border-black hover:bg-gray-50 transition-colors h-full">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 mb-1">PREVIOUS SERMON</p>
                        <h3 className="font-bold text-xs sm:text-sm leading-tight truncate">{themeNavigation.previous.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 truncate">{currentTheme.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
              {themeNavigation.next && (
                <Link href={`/sermons/${themeNavigation.next.id}`}>
                  <Card className="border-2 border-black hover:bg-gray-50 transition-colors h-full">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                      <div className="flex-1 text-right min-w-0">
                        <p className="text-xs text-gray-600 mb-1">NEXT SERMON</p>
                        <h3 className="font-bold text-xs sm:text-sm leading-tight truncate">{themeNavigation.next.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 truncate">{currentTheme.title}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* All Sermons in Theme */}
        {currentTheme && (
          <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 border-b-2 border-black pb-3 sm:pb-4">
              ALL SERMONS IN "{currentTheme.title.toUpperCase()}"
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{currentTheme.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {currentTheme.sermons.map((themeSermon, index) => (
                <Card
                  key={themeSermon.id}
                  className={`border-2 transition-colors ${
                    themeSermon.id === sermon.id ? "border-red-600 bg-red-50" : "border-black hover:bg-gray-50"
                  }`}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded flex-shrink-0">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm leading-tight mb-2">{themeSermon.title}</h3>
                        <p className="text-xs text-gray-600 mb-2 sm:mb-3">{themeSermon.date}</p>
                        {themeSermon.id === sermon.id ? (
                          <Button disabled className="w-full bg-red-600 text-white text-xs py-2">
                            CURRENTLY VIEWING
                          </Button>
                        ) : (
                          <Link href={`/sermons/${themeSermon.id}`}>
                            <Button
                              variant="outline"
                              className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs py-2"
                            >
                              VIEW SERMON
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">COMMENTS ({comments.length})</h2>
          </div>

          {/* Comment Form */}
          <div className="border-2 border-black p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">SHARE YOUR THOUGHTS</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-bold mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newComment.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-bold mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newComment.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-xs sm:text-sm font-bold mb-2">
                  YOUR COMMENT *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newComment.comment}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none text-sm sm:text-base"
                  placeholder="Share how this sermon blessed you or ask questions..."
                ></textarea>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  "SUBMITTING..."
                ) : (
                  <>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    SUBMIT COMMENT
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-4 sm:space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-red-600 pl-3 sm:pl-6 py-3 sm:py-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base lg:text-lg">{comment.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {comment.date} at {comment.time}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{comment.comment}</p>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-600">
              <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
              <p className="text-sm sm:text-base">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </section>

        {/* Other Themes */}
        <section className="border-2 border-black bg-white p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 border-b-2 border-black pb-3 sm:pb-4">OTHER THEMES YOU MIGHT ENJOY</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(themes)
              .filter(([key]) => key !== sermon.category)
              .map(([key, theme]) => (
                <Card key={key} className="border-2 border-black hover:bg-gray-50 transition-colors">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{theme.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">{theme.description}</p>
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs text-gray-500 mb-2">{theme.sermons.length} SERMONS</p>
                      <div className="space-y-1">
                        {theme.sermons.slice(0, 2).map((themeSermon) => (
                          <p key={themeSermon.id} className="text-xs text-gray-700 truncate">
                            • {themeSermon.title}
                          </p>
                        ))}
                        {theme.sermons.length > 2 && (
                          <p className="text-xs text-gray-500">+ {theme.sermons.length - 2} more sermons</p>
                        )}
                      </div>
                    </div>
                    <Link href={`/sermons/${theme.sermons[0].id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-black hover:bg-red-600 hover:text-white bg-transparent text-xs sm:text-sm"
                      >
                        EXPLORE THEME
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}