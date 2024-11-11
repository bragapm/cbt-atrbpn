// Helper function to find or create a session

export const findOrCreateCoupon = async (couponService, couponData) => {
  // Check if a coupon with the same code already exists
  const existingCoupons = await couponService.readByQuery({
    filter: { code: { _eq: couponData.code } },
    limit: 1,
  });

  if (existingCoupons && existingCoupons.length > 0) {
    // If found, return the existing coupon id
    return existingCoupons[0].id;
  }

  // Otherwise, create a new coupon entry
  return await couponService.createOne(couponData);
};
export const findSession = async (sessionName, service) => {
  let session = await service.readByQuery({
    filter: { name: { _eq: sessionName } },
  });

  if (!session || session.length === 0) {
    throw new Error("Session Not Found");
  }

  return session[0] || session; // Return the session object
};

export const findOrCreateUserSessionTest = async (
  userSessionTestService,
  userSessionData
) => {
  // Check if a user session test with the same session and user already exists
  const existingSessions = await userSessionTestService.readByQuery({
    filter: {
      session: { _eq: userSessionData.session },
      user: { _eq: userSessionData.user },
    },
    limit: 1,
  });

  if (existingSessions && existingSessions.length > 0) {
    return existingSessions[0];
  }

  // Otherwise, create a new user session test entry
  return await userSessionTestService.createOne({
    session: userSessionData.session,
    user: userSessionData.user,
    problems: userSessionData.problems,
    created_at: new Date(),
    updated_at: new Date(),
    info_peserta: userSessionData.info_peserta,
  });
};

// Helper function to generate problem array
export const generateProblemsArray = async (
  distribusiService,
  questionService
) => {
  try {
    // Fetch all distributions
    const distribusiList = await distribusiService.readByQuery({
      fields: ["kategori_id", "jumlah_soal"], // Explicitly request required fields
    });

    const problems = [];

    if (!distribusiList || distribusiList.length === 0) {
      throw new Error("Distribusi list is empty or undefined.");
    }

    // Iterate over each distribusi item
    for (const distribusi of distribusiList) {
      const { kategori_id, jumlah_soal } = distribusi;

      if (!kategori_id || !jumlah_soal) {
        continue;
      }

      // Fetch questions for the given category
      const questions = await questionService.readByQuery({
        filter: { kategori_id: { _eq: kategori_id } },
        fields: ["id", "is_required"], // Explicitly request required fields
      });

      if (!questions || questions.length === 0) {
        continue;
      }

      // Separate required and optional questions
      const requiredQuestions = questions.filter((q) => q.is_required);
      const optionalQuestions = questions.filter((q) => !q.is_required);

      // Ensure required questions are in the problem list
      for (const question of requiredQuestions) {
        if (question.id) {
          problems.push(question.id);
        }
      }

      // Randomly select additional questions to meet the jumlah_soal requirement
      const randomQuestions = optionalQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, jumlah_soal - requiredQuestions.length);

      for (const question of randomQuestions) {
        if (question.id) {
          problems.push(question.id);
        }
      }
    }

    return problems;
  } catch (error) {
    console.error("Error generating problems:", error);
    throw new Error(`Failed to generate problems array: ${error.message}`);
  }
};
