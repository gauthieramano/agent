# Prompt

Consider a triangle with these side lengths: 5, 12 and 14. You have to return the value of each angle of this triangle. What is the Python code you would use to calculate these angles?

# Agent response

```json
{
  "message": {
    "id": "hhMeu4B5b7TdzzRD",
    "role": "assistant",
    "parts": [
      {
        "type": "step-start"
      },
      {
        "type": "text",
        "text": "To get the three angles (in degrees) from the side lengths 5, 12, and 14, you can use the Law of Cosines:\n\n```python\nimport math\n\n# side lengths\na = 5\nb = 12\nc = 14\n\n# Law of Cosines:\n# cos(A) = (b^2 + c^2 - a^2) / (2 * b * c)\n# cos(B) = (a^2 + c^2 - b^2) / (2 * a * c)\n# cos(C) = (a^2 + b^2 - c^2) / (2 * a * b)\n\nA = math.degrees(math.acos((b**2 + c**2 - a**2) / (2 * b * c)))\nB = math.degrees(math.acos((a**2 + c**2 - b**2) / (2 * a * c)))\nC = math.degrees(math.acos((a**2 + b**2 - c**2) / (2 * a * b)))\n\nprint(f\"Angle opposite side 5:  {A:.6f} degrees\")\nprint(f\"Angle opposite side 12: {B:.6f} degrees\")\nprint(f\"Angle opposite side 14: {C:.6f} degrees\")\n```",
        "providerMetadata": {
          "openai": {
            "itemId": "msg_089fa6495c6c33ca0169225d3033ac81959d28bc5c1edf98ef"
          }
        },
        "state": "done"
      }
    ]
  }
}
```
