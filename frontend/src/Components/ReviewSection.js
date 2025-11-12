import React from 'react';
import { Star } from 'lucide-react';

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "PS",
      rating: 5,
      text: "Absolutely stunning collection! The quality is exceptional and the service is impeccable. Trusted them for my wedding jewellery.",
      role: "Bride"
    },
    {
      id: 2,
      name: "Amit Patel",
      avatar: "AP",
      rating: 5,
      text: "Three generations of our family have trusted Shree Jewellers. Their craftsmanship and honesty are unmatched.",
      role: "Loyal Customer"
    },
    {
      id: 3,
      name: "Aman Singh",
      avatar: "AS",
      rating: 5,
      text: "The digital payment tracking is so convenient! I can check my account anytime. Traditional values with modern convenience.",
      role: "Regular Customer"
    },
    {
      id: 4,
      name: "Vikram Soni",
      avatar: "VS",
      rating: 5,
      text: "Bought my wife's anniversary gift here. The staff helped me choose the perfect piece. Outstanding experience!",
      role: "Happy Husband"
    },
    {
      id: 5,
      name: "Meera Krishnan",
      avatar: "MK",
      rating: 5,
      text: "Beautiful designs and excellent after-sales service. They really care about their customers. Highly recommended!",
      role: "Jewellery Enthusiast"
    },
    {
      id: 6,
      name: "Amit Gupta",
      avatar: "AG",
      rating: 5,
      text: "Best jewellers in town! Fair pricing, genuine gold, and the advance payment system is very helpful.",
      role: "Business Owner"
    },
    {
      id: 7,
      name: "Sneha Reddy",
      avatar: "SR",
      rating: 5,
      text: "My entire bridal set was crafted here. Every piece is a work of art. Thank you for making my day special!",
      role: "Delighted Bride"
    },
    {
      id: 8,
      name: "Karthik Menon",
      avatar: "KM",
      rating: 5,
      text: "Transparent pricing and genuine quality. The online account management is a game-changer. Excellent service!",
      role: "Professional"
    }
  ];

  const infiniteReviews = [...reviews];

  return (
    <div style={{
      padding: "80px 0",
      overflow: "hidden",
      position: "relative"
    }}>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          .scroll-container {
            display: flex;
            animation: scroll-left 10s linear infinite;
          }

          .scroll-container:hover {
            animation-play-state: paused;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            animation: fadeInUp 0.8s ease-out;
          }
        `}
      </style>

      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "60px",
        padding: "0 20px",
        position: "relative",
        zIndex: 1
      }} className="fade-in">
        <h2 style={{
          fontSize: "40px",
          fontWeight: "700",
          color: "#fff",
          marginBottom: "15px",
          textShadow: "0 4px 20px rgba(0,0,0,0.5)"
        }}>
          What Our Customers Say
        </h2>
        <p style={{
          fontSize: "18px",
          color: "rgba(212, 175, 55, 0.9)",
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          Trusted by families for over three generations ✨
        </p>
      </div>

      {/* Scrolling Reviews */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="scroll-container">
          {infiniteReviews.map((review, index) => (
            <div
              key={`review-${index}`}
              style={{
                flexShrink: 0,
                width: "400px",
                margin: "0 16px"
              }}
            >
              <div style={{
                background: "linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)",
                borderRadius: "20px",
                padding: "30px",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                transition: "all 0.3s ease",
                height: "100%"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(212, 175, 55, 0.3)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
              }}>
                
                {/* Avatar and Name */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px"
                }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a1a1a",
                    fontWeight: "700",
                    fontSize: "18px",
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
                    flexShrink: 0
                  }}>
                    {review.avatar}
                  </div>
                  <div style={{ marginLeft: "16px", flex: 1 }}>
                    <h4 style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "18px",
                      marginBottom: "4px"
                    }}>
                      {review.name}
                    </h4>
                    <p style={{
                      color: "rgba(212, 175, 55, 0.8)",
                      fontSize: "14px"
                    }}>
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div style={{
                  display: "flex",
                  gap: "4px",
                  marginBottom: "16px"
                }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      style={{
                        width: "18px",
                        height: "18px",
                        fill: "#FFD700",
                        color: "#FFD700"
                      }}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  fontStyle: "italic"
                }}>
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;