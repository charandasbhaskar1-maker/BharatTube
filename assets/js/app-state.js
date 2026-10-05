/* =========================================================
   BHARATTUBE CENTRAL STATE & LOCAL STORAGE SYNC ENGINE
   ========================================================= */

const BharatTubeState = {
    // Dynamic Growth Criteria (Starting Phase)
    criteria: {
        requiredSubscribers: 200,   // Initial Phase Target
        requiredWatchHours: 100     // Initial Phase Target
    },

    defaultData: {
        creatorName: 'Charandas Bhaskar',
        channelHandle: '@charandas_creator',
        subscribersCount: 245,       // Creator crosses 200 target
        watchHours: 112,            // Creator crosses 100 hours target
        monetizationStage: 'eligible', // 'eligible' | 'under_review' | 'approved' | 'rejected'
        hasApplied: false,
        strikesCount: 0,
        payoutUpi: 'bhaskar@okaxis',
        estimatedRevenue: 0.00
    },

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

    saveState(updates) {
        const current = this.getState();
        const merged = { ...current, ...updates };
        localStorage.setItem('bt_creator_state', JSON.stringify(merged));
        return merged;
    },

    // Check Eligibility dynamically
    checkEligibility() {
        const state = this.getState();
        return (
            state.subscribersCount >= this.criteria.requiredSubscribers &&
            state.watchHours >= this.criteria.requiredWatchHours &&
            state.strikesCount === 0
        );
    },

    isPartnerActive() {
        const state = this.getState();
        return state.monetizationStage === 'approved' && state.strikesCount === 0;
    }
};

window.BharatTubeState = BharatTubeState;
