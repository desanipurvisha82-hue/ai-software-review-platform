package com.novexa.review_platform.service;

import com.novexa.review_platform.dto.AiSummaryResponse;
import com.novexa.review_platform.entity.Review;
import com.novexa.review_platform.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiSummaryService {

    private final ReviewRepository reviewRepository;

    public AiSummaryResponse generateSummary(Long softwareId) {

        List<Review> reviews = reviewRepository.findBySoftwareId(softwareId);

        if (reviews.isEmpty()) {
            return new AiSummaryResponse(softwareId, "No reviews available for this software.");
        }

        StringBuilder reviewText = new StringBuilder();

        for (Review review : reviews) {
            reviewText.append("Rating: ")
                    .append(review.getRating())
                    .append("/5, Title: ")
                    .append(review.getTitle())
                    .append(", Comment: ")
                    .append(review.getComment())
                    .append("\n");
        }

      String prompt = """
        Summarize all reviews together in one short professional paragraph.
        Do not separate review by review.
        Mention overall opinion, strengths, weaknesses, and recommendation.

        Reviews:
        """ + reviewText;

        WebClient webClient = WebClient.create();

        Map<String, Object> requestBody = Map.of(
                "model", "llama3.2:1b",
                "prompt", prompt,
                "stream", false
        );

        try {
            Map response = webClient.post()
                    .uri("http://localhost:11434/api/generate")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            String summary = response.get("response").toString();

            return new AiSummaryResponse(softwareId, summary);

        } catch (Exception e) {
            return new AiSummaryResponse(softwareId, "Ollama AI summary failed: " + e.getMessage());
        }
    }
}