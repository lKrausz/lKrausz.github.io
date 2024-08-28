
export const updateUserStatus = async (
    userId: string,
    campaignId: string,
    status: string,
    fetchBrands: Function
  ) => {
    if (!userId || !campaignId) {
      console.error("Error: Missing userId or campaignId");
      return;
    }

    try {
      const response = await fetch(
        "https://bonusnumber1.com/api/addStatus/add_status.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            campaignId: campaignId,
            status: status,
          }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      if(response.ok) {
        fetchBrands();
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };