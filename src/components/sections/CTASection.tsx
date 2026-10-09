'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { SectionHeader } from '@/components/common/SectionHeader';
import { useAudio } from '@/hooks/useAudio';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

// Retro Stage 5 channel specifications matching design reference
const RETRO_CHANNELS = [
  {
    id: 'github',
    label: 'GITHUB',
    handle: '/ajaykumardrb',
    url: 'https://github.com/AjayKumar-DRB',
    handleColor: '#EF4444',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    handle: '/in/ajaykumardrb',
    url: 'https://linkedin.com/in/ajaykumardrb',
    handleColor: '#3B82F6',
  },
  {
    id: 'email',
    label: 'EMAIL',
    handle: 'ajaykumardrb@gmail.com',
    url: 'mailto:ajaykumardrb@gmail.com',
    handleColor: '#446b30ff',
  },
];

const retroInput = {
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  padding: '10px 12px',
  background: '#FAFAF8',
  border: '2px solid #0F172A',
  color: '#0F172A',
  outline: 'none',
  width: '100%',
};

export function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playHover } = useAudio();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        '29b53909-2c7d-46f3-b809-f62c6e417da3';

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `⚡ [Transmission] New Mission Inquiry from ${data.name}`,
          from_name: 'Ajay Kumar DRB Portfolio',
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to send transmission');
      }

      toast.success('TRANSMISSION SENT!', {
        description: 'Transmission received. Frequency locked.',
      });
      reset();
    } catch {
      toast.error('TRANSMISSION FAILED', {
        description: 'Please try again or connect directly via LinkedIn or email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="z-10 relative bg-transparent py-16 md:py-24 border-slate-900 border-b-2"
    >
      <div className="mx-auto px-6 container">
        <SectionHeader
          stage="STAGE 05"
          title="LET'S BUILD"
          subtitle="Hire me for your next ambitious project — open a channel below."
          accentColor="#E11D48"
        />

        <motion.div
          className="items-start gap-6 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* ── LEFT: Social channel cards matching reference image 1 ── */}
          <div className="space-y-3">
            {RETRO_CHANNELS.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="flex justify-between items-center bg-white shadow-[4px_4px_0px_#0F172A] hover:shadow-[2px_2px_0px_#0F172A] active:shadow-none px-4 sm:px-5 py-3 sm:py-3.5 border-2 border-slate-900 no-underline transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] duration-75 cursor-pointer select-none"
              >
                {/* Channel Label */}
                <span
                  className="font-bold text-[9px] text-slate-900 sm:text-[10px] uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {channel.label}
                </span>
                {/* Channel Handle */}
                <span
                  className="font-mono font-medium text-[12px] sm:text-[13px] tracking-normal"
                  style={{
                    color: channel.handleColor,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {channel.handle}
                </span>
              </a>
            ))}
          </div>

          {/* ── RIGHT: Transmit form matching ReferenceCode.txt ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-[4px_4px_0px_#0F172A] p-6 border-2 border-slate-900"
          >
            {/* Form header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-rose-600 w-8 h-[2px]" />
              <span
                className="font-bold text-[10px] text-rose-600 uppercase tracking-widest whitespace-nowrap"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                TRANSMIT MESSAGE
              </span>
              <span className="flex-1 bg-rose-600/30 h-[2px]" />
            </div>

            {/* Row 1: Callsign + Frequency */}
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              <div>
                <label
                  className="block mb-2 font-bold text-[9px] text-slate-900 uppercase tracking-[0.15em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  CALLSIGN
                </label>
                <input
                  {...register('name')}
                  placeholder="Player One"
                  style={retroInput}
                  className="focus:ring-2 focus:ring-rose-500 transition-shadow"
                />
                {errors.name && (
                  <p className="mt-1 font-mono text-[10px] text-rose-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label
                  className="block mb-2 font-bold text-[9px] text-slate-900 uppercase tracking-[0.15em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  FREQUENCY
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@studio.com"
                  style={retroInput}
                  className="focus:ring-2 focus:ring-rose-500 transition-shadow"
                />
                {errors.email && (
                  <p className="mt-1 font-mono text-[10px] text-rose-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Transmission */}
            <div className="mt-4">
              <label
                className="block mb-2 font-bold text-[9px] text-slate-900 uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                TRANSMISSION
              </label>
              <textarea
                {...register('message')}
                placeholder="Enter transmission data..."
                rows={5}
                style={{ ...retroInput, resize: 'none' as const }}
                className="focus:ring-2 focus:ring-rose-500 transition-shadow"
              />
              {errors.message && (
                <p className="mt-1 font-mono text-[10px] text-rose-600">{errors.message.message}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={playHover}
              className="flex justify-center items-center gap-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-75 shadow-[4px_4px_0px_#0F172A] hover:shadow-[2px_2px_0px_#0F172A] active:shadow-none mt-5 px-6 py-3.5 border-2 border-slate-900 w-full font-bold text-[10px] text-white uppercase tracking-wider transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] duration-75 cursor-pointer disabled:cursor-wait select-none"
              style={{
                background: isSubmitting ? '#9B1227' : '#E11D48',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {isSubmitting ? (
                <span>◌ TRANSMITTING...</span>
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <span className="text-[9px] leading-none">►</span>
                  <span>TRANSMIT</span>
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
