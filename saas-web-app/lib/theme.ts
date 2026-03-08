export const getThemeGradient = (theme: string) => {
    switch (theme) {
        case 'spatial-default': return 'from-[#0A84FF] to-[#32D74B] drop-shadow-[0_0_12px_rgba(10,132,255,0.4)]';
        case 'product-red': return 'from-[#FF3B30] to-[#FF9500] drop-shadow-[0_0_12px_rgba(255,59,48,0.4)]';
        case 'starlight': return 'from-[#FFD60A] to-[#FFF5D0] drop-shadow-[0_0_12px_rgba(255,214,10,0.4)]';
        case 'midnight': return 'from-[#5856D6] to-[#0A84FF] drop-shadow-[0_0_12px_rgba(88,86,214,0.4)]';
        case 'aurora': return 'from-[#30D158] to-[#64D2FF] drop-shadow-[0_0_12px_rgba(48,209,88,0.4)]';
        case 'deep-space': return 'from-[#5E5CE6] to-[#BF5AF2] drop-shadow-[0_0_12px_rgba(94,92,230,0.4)]';
        case 'sunset': return 'from-[#FF9500] to-[#FF2D55] drop-shadow-[0_0_12px_rgba(255,149,0,0.4)]';
        case 'ocean': return 'from-[#64D2FF] to-[#0A84FF] drop-shadow-[0_0_12px_rgba(100,210,255,0.4)]';
        case 'forest': return 'from-[#32D74B] to-[#FFD60A] drop-shadow-[0_0_12px_rgba(50,215,75,0.4)]';
        case 'cyber': return 'from-[#FF2D55] to-[#64D2FF] drop-shadow-[0_0_12px_rgba(255,45,85,0.4)]';
        default: return 'from-[#0A84FF] to-[#32D74B] drop-shadow-[0_0_12px_rgba(10,132,255,0.4)]';
    }
};

export const getThemeBg = (theme: string) => {
    switch (theme) {
        case 'spatial-default': return 'bg-gradient-to-r from-[#0A84FF]/20 to-[#32D74B]/20 border-[#0A84FF]/30';
        case 'product-red': return 'bg-gradient-to-r from-[#FF3B30]/20 to-[#FF9500]/20 border-[#FF3B30]/30';
        case 'starlight': return 'bg-gradient-to-r from-[#FFD60A]/20 to-[#FFF5D0]/20 border-[#FFD60A]/30';
        case 'midnight': return 'bg-gradient-to-r from-[#5856D6]/20 to-[#0A84FF]/20 border-[#5856D6]/30';
        case 'aurora': return 'bg-gradient-to-r from-[#30D158]/20 to-[#64D2FF]/20 border-[#30D158]/30';
        case 'deep-space': return 'bg-gradient-to-r from-[#5E5CE6]/20 to-[#BF5AF2]/20 border-[#5E5CE6]/30';
        case 'sunset': return 'bg-gradient-to-r from-[#FF9500]/20 to-[#FF2D55]/20 border-[#FF9500]/30';
        case 'ocean': return 'bg-gradient-to-r from-[#64D2FF]/20 to-[#0A84FF]/20 border-[#64D2FF]/30';
        case 'forest': return 'bg-gradient-to-r from-[#32D74B]/20 to-[#FFD60A]/20 border-[#32D74B]/30';
        case 'cyber': return 'bg-gradient-to-r from-[#FF2D55]/20 to-[#64D2FF]/20 border-[#FF2D55]/30';
        default: return 'bg-gradient-to-r from-[#0A84FF]/20 to-[#32D74B]/20 border-[#0A84FF]/30';
    }
};
