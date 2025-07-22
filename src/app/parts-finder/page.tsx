'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, Camera, Loader, Search, X } from 'lucide-react';
import { partsFromImage, PartsFromImageOutput } from '@/ai/flows/parts-from-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PartsFinderPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [suggestedParts, setSuggestedParts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSuggestedParts([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFindParts = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const result: PartsFromImageOutput = await partsFromImage({ photoDataUri: selectedImage });
      setSuggestedParts(result.suggestedParts);
    } catch (error) {
      console.error('Error finding parts from image:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setSuggestedParts([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Image-Based Part Finder</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a part but don't know its name? Upload a picture, and our AI will identify it and suggest similar parts from our store.
        </p>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Camera className="h-6 w-6 text-primary" />
            Upload Your Part's Image
          </CardTitle>
          <CardDescription>
            For best results, use a clear image with good lighting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="relative border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {selectedImage ? (
              <div className="relative group">
                <Image
                  src={selectedImage}
                  alt="Selected part"
                  width={400}
                  height={400}
                  className="rounded-md mx-auto max-h-64 w-auto object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Camera className="h-8 w-8" />
                </div>
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
          {selectedImage && (
            <Button onClick={handleFindParts} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Matching Parts
                </>
              )}
            </Button>
          )}
        </CardContent>
        {suggestedParts.length > 0 && (
          <CardFooter className="flex flex-col items-start gap-4">
            <h3 className="text-lg font-semibold font-headline">Suggested Parts:</h3>
            <ul className="list-disc list-inside space-y-2 w-full">
              {suggestedParts.map((part, index) => (
                <li key={index} className="text-muted-foreground">{part}</li>
              ))}
            </ul>
            <Button variant="outline" className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" /> Go to Store
            </Button>
          </CardFooter>
        )}
        {isLoading && suggestedParts.length === 0 && (
           <CardFooter>
             <Alert>
                <Loader className="h-4 w-4 animate-spin" />
                <AlertTitle>AI is thinking</AlertTitle>
                <AlertDescription>
                  Our AI is analyzing your image to find matching parts. This may take a few moments.
                </AlertDescription>
              </Alert>
           </CardFooter>
        )}
      </Card>
    </div>
  );
}
