# Product Manager — technical test

## Who we are

Quiet is a French app studio based in Paris. We build consumer mobile utilities — phone and photo
cleaners, an app locker, an email cleaner. We monetise through ads and subscriptions, we ship on
Android and iOS, and we do it as a very small team, on short cycles. Nobody hands you a spec, a
design, or a backend.

## The role you are applying for

**Product Manager.** You spend hours in our apps, and in the ones we compete with. You find what is
broken, what is inconsistent, and what quietly costs us money. You report it in a form the team can
act on, and you automate that work instead of repeating it. Later you own the roadmap of an app.

This test is a small version of that job.

---

## The test

**QuietClean** is not one of our apps. It is the kind of app we build — a small utility, put
together fast. It is in this repo, and it runs on your phone in about a minute.

Use it. Find what is wrong with it. Tell us.

Budget **half a day**. It is not a hard limit.

Please **do not** push your work to a public repository. Set up private sharing **before** you start:
[docs/HOW_TO_SHARE_MY_CODE.md](./docs/HOW_TO_SHARE_MY_CODE.md)

### Run it on your phone

1. Install **Expo Go** from the App Store or the Play Store.
2. In this folder:

```bash
npm install
npm start
```

3. Scan the QR code in your terminal with Expo Go (Android) or with the Camera app (iPhone).

The app opens on your phone. The photo library inside it is fake and bundled, so everyone sees exactly
the same thing.

`npm run web` also works if you want it in a browser. The phone is the real target.

The whole source is in the repo. What you do with that is up to you.

### What we want back

A report in [docs/REPORT.md](./docs/REPORT.md). The file is empty. Its shape is your call.

Also fill in [docs/AI_LOG.md](./docs/AI_LOG.md) — how you worked, not just what you found.

---

## What we look for

1. You found everything that is wrong.
2. The report is well structured.
3. Automation.

You don't have to do all of it. This is just what we look at, in this order.

Surprise us.

---

## Notes

* Report what you can reproduce. A finding we cannot reproduce is worse than no finding.
* Say how sure you are. Being wrong and honest costs less than being wrong and confident.
* **Do this with AI.** That is how we work, and it is the part we are reading most closely — not
  whether you used it, but how you drove it. Document that in `docs/AI_LOG.md`.
* You still own the result. In the live debrief we go through it with you and ask you to change things
  on the spot.
