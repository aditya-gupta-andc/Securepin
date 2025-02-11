import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { pinAuthSchema } from "@shared/schema";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { LockKeyhole, Loader2 } from "lucide-react";
import { Numpad } from "@/components/ui/numpad";

export default function PinAuth() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const form = useForm({
    resolver: zodResolver(pinAuthSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Effect to auto-submit when PIN is complete
  useEffect(() => {
    const pin = form.watch("pin");
    if (pin.length === 4) {
      onSubmit({ pin });
    }
  }, [form.watch("pin")]);

  async function onSubmit(values: { pin: string }) {
    if (!values.pin || values.pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 4-digit PIN",
        variant: "destructive",
      });
      return;
    }

    setIsPending(true);
    try {
      await apiRequest("POST", "/api/validate-pin", values);

      toast({
        title: "Success!",
        description: "Redirecting you...",
        variant: "default",
      });

      setTimeout(() => {
        window.location.href = "https://xyz.com";
      }, 1500);
    } catch (error) {
      form.reset();
      toast({
        title: "Invalid PIN",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  // Handle numpad input
  const handleKeyPress = (key: string) => {
    const currentPin = form.watch("pin");
    if (currentPin.length < 4) {
      form.setValue("pin", currentPin + key);
    }
  };

  const handleBackspace = () => {
    const currentPin = form.watch("pin");
    if (currentPin.length > 0) {
      form.setValue("pin", currentPin.slice(0, -1));
    }
  };

  // Prevent keyboard input
  useEffect(() => {
    const preventDefault = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventDefault);
    return () => window.removeEventListener('keydown', preventDefault);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFAFA] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <Card className="backdrop-blur-sm bg-white/80 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#212121] flex items-center justify-center gap-2">
              <LockKeyhole className="w-6 h-6 text-[#2196F3]" />
              Enter PIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      value={form.watch("pin")}
                      onChange={(value) => form.setValue("pin", value)}
                      disabled
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2">
                          {slots.map((slot, idx) => (
                            <motion.div
                              key={idx}
                              initial={false}
                              animate={{ 
                                scale: slot.isActive ? 1.05 : 1,
                                opacity: isPending ? 0.7 : 1 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <InputOTPSlot
                                {...slot}
                                index={idx}
                                className="w-14 h-14 text-2xl border-2 text-black transition-all duration-300"
                              />
                            </motion.div>
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  {form.formState.errors.pin && (
                    <p className="text-sm text-[#F44336] text-center">
                      {form.formState.errors.pin.message}
                    </p>
                  )}
                </div>

                <Numpad 
                  onKeyPress={handleKeyPress}
                  onBackspace={handleBackspace}
                />

                <Button
                  type="submit"
                  className="w-full font-semibold transition-all duration-300"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}