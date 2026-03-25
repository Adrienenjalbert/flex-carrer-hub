import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTestimonialsByIndustry, flexerTestimonials } from "@/lib/data/testimonials";

interface FlexerTestimonialsProps {
  industry?: string;
}

const FlexerTestimonials = ({ industry }: FlexerTestimonialsProps) => {
  const testimonials = industry
    ? getTestimonialsByIndustry(industry).slice(0, 3)
    : flexerTestimonials.slice(0, 3);

  if (testimonials.length === 0) return null;

  return (
    <section className="my-10">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        What Flexers Say
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="border-l-4 border-l-indigo-400 border-t-0 border-r-0 border-b-0 shadow-sm"
          >
            <CardContent className="p-5">
              <Quote className="h-5 w-5 text-indigo-400 mb-3" />
              <p className="italic text-muted-foreground text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-sm">
                  {testimonial.name}
                </span>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                  {testimonial.industry}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Source:{" "}
        <a
          href="https://indeedflex.com/meet-the-community/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          indeedflex.com
        </a>
      </p>
    </section>
  );
};

export default FlexerTestimonials;
