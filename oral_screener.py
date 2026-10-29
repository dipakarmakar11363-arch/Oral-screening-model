"""
Multi-Modal Oral & Facial Health Screener - Python Implementation
Requires:
    pip install google-genai pillow pydantic

Usage:
    export GEMINI_API_KEY="your-api-key-here"
    python oral_screener.py path/to/mouth_or_face_image.jpg
"""

import os
import sys
import json
from PIL import Image
from pydantic import BaseModel, Field
from typing import List
from google import genai
from google.genai import types


# Define the structured report schema using Pydantic
class AttentionArea(BaseModel):
    title: str = Field(description="Title of observation topic")
    description: str = Field(description="Soft, non-diagnostic explanation")
    level: str = Field(description="Routine, Moderate Attention, or Special Attention")


class EducationalReport(BaseModel):
    overallSummary: str = Field(description="2-3 sentence overview")
    visualObservations: List[str] = Field(description="Part 1: Visual observations of teeth, gums, or face")
    possibleAreasOfAttention: List[AttentionArea] = Field(description="Part 2: Non-diagnostic areas of attention")
    lifestyleSuggestions: List[str] = Field(description="Part 3: Practical preventive hygiene suggestions")
    educationalDisclaimer: str = Field(description="Part 4: Strong educational disclaimer")


def screen_oral_photo(image_path: str) -> dict:
    """
    Analyzes an oral or facial photo using Gemini and returns a 4-part structured report.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Please set the GEMINI_API_KEY environment variable.")

    # Initialize Gemini client
    client = genai.Client(api_key=api_key)

    # Load local image
    image = Image.open(image_path)

    system_instruction = (
        "You are an AI-powered Educational Assistant for the prototype named "
        "'Multi-Modal Oral & Facial Health Screener'.\n"
        "THIS IS STRICTLY AN EDUCATIONAL PROTOTYPE AND NOT A MEDICAL DIAGNOSTIC TOOL.\n\n"
        "RULES:\n"
        "1. NEVER diagnose any disease, pathology, or medical condition.\n"
        "2. ALWAYS use soft, tentative, non-diagnostic language.\n"
        "3. Provide exactly 4 parts: Visual Observations, Possible Areas of Attention, "
        "General Lifestyle Suggestions, and a Strong Educational Disclaimer."
    )

    user_prompt = (
        "Inspect the provided mouth or facial photo and generate a structured 4-part educational report."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[image, user_prompt],
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            response_schema=EducationalReport,
        ),
    )

    return json.loads(response.text)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python oral_screener.py <path_to_image>")
        sys.exit(1)

    file_path = sys.argv[1]
    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}")
        sys.exit(1)

    print(f"Analyzing {file_path} with Gemini...")
    try:
        report = screen_oral_photo(file_path)
        print("\n--- EDUCATIONAL REPORT ---")
        print(json.dumps(report, indent=2))
    except Exception as e:
        print(f"Error: {e}")
