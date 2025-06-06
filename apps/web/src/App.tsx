import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Toaster, toast } from "@workspace/ui/components/sonner";
import { type CreateShortLinkRequest } from "@workspace/schema";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import {
  AnimatedTitle,
  ShortenForm,
  ShortenedUrlDisplay,
  Footer,
} from "./components";

import { createShortLink } from "./api/createShortLink";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const title = "Shorten Your Link";

  const { mutate, isPending } = useMutation({
    mutationFn: createShortLink,
    onSuccess: (data) => {
      const shortUrl = `${import.meta.env.VITE_REDIRECT_URL}/${data.shortCode}`;
      setShortUrl(shortUrl);
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Error shortening URL");
    },
  });

  const onSubmit = (data: CreateShortLinkRequest) => {
    mutate(data);
  };

  return (
    <div className="bg-hero-gradient flex min-h-screen flex-col overflow-x-hidden px-2 sm:px-0">
      <main className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="px-2 py-8 sm:px-0 sm:py-14">
            <CardHeader className="space-y-6 text-center">
              <div className="space-y-4">
                <AnimatedTitle title={title} />
                <motion.p
                  className="text-xl font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: title.length * 0.03 + 0.2 }}
                >
                  Paste, Click, Done.
                </motion.p>
              </div>
              <motion.p
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Free • No signup needed • Share anywhere
              </motion.p>
            </CardHeader>

            <CardContent className="px-2 py-6 sm:px-8">
              <ShortenForm isLoading={isPending} onSubmit={onSubmit} />
              <AnimatePresence>
                <ShortenedUrlDisplay shortUrl={shortUrl} />
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex justify-center">
              <motion.p
                className="text-center text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Simple • Fast • Secure • Free Forever
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
