/* =========================================================
   BHARATTUBE CENTRAL STATE & LOCAL STORAGE SYNC ENGINE
   ========================================================= */

const BharatTubeState = {
    // Default initial data
    defaultData: {
        creatorName: 'Charandas Bhaskar',
        channelHandle: '@charandas_creator',
        subscribersCount: 45200,
        watchHours: 4820,
        monetizationStage: 'eligible', // 'eligible' | 'under_review' | 'approved' | 'rejected'
        hasApplied: false,
        strikesCount: 0,
        payoutUpi: 'bhaskar@okaxis',
        estimatedRevenue: 42850.00
    },

    // Load current state
    getState() {
        const stored = localStorage.getItem('bt_creator_state');
        if (stored) {
            try {
                return { ...this.defaultData, ...JSON.parse(stored) };
            } catch(e) {
                return this.defaultData;
            }
        }
        return this.defaultData;
    },

    // Save updated state
    saveState(updates) {
        const current = this.getState();
        const merged = { ...current, ...updates };
        localStorage.setItem('bt_creator_state', JSON.stringify(merged));
        return merged;
    },

    // Check if channel is monetized
    isPartnerActive() {
        const state = this.getState();
        return state.monetizationStage === 'approved' && state.strikesCount === 0;
    }
};

window.BharatTubeState = BharatTubeState;
