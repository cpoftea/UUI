const AVATAR_1 = `
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4NCiAgICA8bWFzayBpZD0idmlld2JveE1hc2siPg0KICAgICAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSI4IiByeT0iOCIgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvbWFzaz4NCiAgICA8ZyBtYXNrPSJ1cmwoI3ZpZXdib3hNYXNrKSI+DQogICAgICAgIDxyZWN0IGZpbGw9IiNiNmUzZjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeD0iMCIgeT0iMCIvPg0KICAgICAgICA8cGF0aCBkPSJNNCAyaDh2MWgxdjNoMXYyaC0xdjNoLTF2MUg5djFoNHYxaDF2Mkgydi0yaDF2LTFoNHYtMUg0di0xSDNWOEgyVjZoMVYzaDFWMloiIGZpbGw9IiNiNjg2NTUiLz4NCiAgICAgICAgPHBhdGggZD0iTTQgMmg4djFoMXYzaDF2MmgtMXYzaC0xdjFINHYtMUgzVjhIMlY2aDFWM2gxVjJaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+DQogICAgICAgIDxwYXRoIGQ9Ik03IDEyaDJ2MWg0djFoMXYySDJ2LTJoMXYtMWg0di0xWiIgZmlsbD0iIzg4ZDhiMCIvPg0KICAgICAgICA8cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4zIiBkPSJNNyAxMmgydjFIN3oiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDVIOXYzaDN6TTcgNUg0djNoM3oiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iIzY5N2I5NCIgZD0iTTEyIDZoLTJ2MWgyek03IDZINXYxaDJ6Ii8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik0xMiA2aC0xdjFoMXpNNyA2SDZ2MWgxeiIvPg0KICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCINCiAgICAgICAgICAgICAgZD0iTTIgNXYxaDF2MmgxdjFoM1Y4aDJ2MWgzVjhoMVY2aDFWNUg5djFIN1Y1SDJabTUgMXYySDRWNmgzWm0yIDB2MmgzVjZIOVoiIGZpbGw9IiM0YjRiNGIiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMyIgZD0iTTQgNmgzdjJINHpNOSA2aDN2Mkg5eiIvPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4yIiBkPSJNMiA1aDJ2MUgyek0xMiA1aDJ2MWgtMnoiLz4NCiAgICAgICAgPHBhdGggZD0iTTEwIDExdi0xSDdWOUg2djFoMXYxaDNaIiBmaWxsPSIjZDI5OTg1Ii8+DQogICAgICAgIDxwYXRoIGZpbGw9IiMyODE1MGEiIGQ9Ik03IDFoMnYySDd6Ii8+DQogICAgPC9nPg0KPC9zdmc+DQo=`
;

const AVATAR_2 = `
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4NCiAgICA8bWFzayBpZD0idmlld2JveE1hc2siPg0KICAgICAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSI4IiByeT0iOCIgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvbWFzaz4NCiAgICA8ZyBtYXNrPSJ1cmwoI3ZpZXdib3hNYXNrKSI+DQogICAgICAgIDxyZWN0IGZpbGw9IiNiNmUzZjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeD0iMCIgeT0iMCIvPg0KICAgICAgICA8cGF0aCBkPSJNNCAyaDh2MWgxdjNoMXYyaC0xdjNoLTF2MUg5djFoNHYxaDF2Mkgydi0yaDF2LTFoNHYtMUg0di0xSDNWOEgyVjZoMVYzaDFWMloiIGZpbGw9IiNiNjg2NTUiLz4NCiAgICAgICAgPHBhdGggZD0iTTQgMmg4djFoMXYzaDF2MmgtMXYzaC0xdjFINHYtMUgzVjhIMlY2aDFWM2gxVjJaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+DQogICAgICAgIDxwYXRoIGQ9Ik03IDEyaDJ2MWg0djFoMXYySDJ2LTJoMXYtMWg0di0xWiIgZmlsbD0iIzI4MTUwYSIvPg0KICAgICAgICA8cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4zIiBkPSJNNyAxMmgydjFIN3oiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDVIOXYzaDN6TTcgNUg0djNoM3oiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iIzY5N2I5NCIgZD0iTTEyIDZoLTJ2MWgyek03IDZINXYxaDJ6Ii8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik0xMiA2aC0xdjFoMXpNNyA2SDZ2MWgxeiIvPg0KICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCINCiAgICAgICAgICAgICAgZD0iTTIgNXYxaDF2MmgxdjFoM1Y4aDJ2MWgzVjhoMVY2aDFWNUg5djFIN1Y1SDJabTUgMXYySDRWNmgzWm0yIDB2MmgzVjZIOVoiIGZpbGw9IiM0YjRiNGIiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMyIgZD0iTTQgNmgzdjJINHpNOSA2aDN2Mkg5eiIvPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4yIiBkPSJNMiA1aDJ2MUgyek0xMiA1aDJ2MWgtMnoiLz4NCiAgICAgICAgPHBhdGggZD0iTTEwIDExdi0xSDdWOUg2djFoMXYxaDNaIiBmaWxsPSIjZDI5OTg1Ii8+DQogICAgICAgIDxwYXRoIGZpbGw9IiMyODE1MGEiIGQ9Ik03IDFoMnYySDd6Ii8+DQogICAgPC9nPg0KPC9zdmc+DQo=`
;

const AVATAR_3 = `
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4NCiAgICA8bWFzayBpZD0idmlld2JveE1hc2siPg0KICAgICAgICA8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSI4IiByeT0iOCIgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvbWFzaz4NCiAgICA8ZyBtYXNrPSJ1cmwoI3ZpZXdib3hNYXNrKSI+DQogICAgICAgIDxyZWN0IGZpbGw9IiNiNmUzZjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeD0iMCIgeT0iMCIvPg0KICAgICAgICA8cGF0aCBkPSJNNCAyaDh2MWgxdjNoMXYyaC0xdjNoLTF2MUg5djFoNHYxaDF2Mkgydi0yaDF2LTFoNHYtMUg0di0xSDNWOEgyVjZoMVYzaDFWMloiIGZpbGw9IiNiNjg2NTUiLz4NCiAgICAgICAgPHBhdGggZD0iTTQgMmg4djFoMXYzaDF2MmgtMXYzaC0xdjFINHYtMUgzVjhIMlY2aDFWM2gxVjJaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+DQogICAgICAgIDxwYXRoIGQ9Ik03IDEyaDJ2MWg0djFoMXYySDJ2LTJoMXYtMWg0di0xWiIgZmlsbD0iIzkwMDAwMCIvPg0KICAgICAgICA8cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4zIiBkPSJNNyAxMmgydjFIN3oiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDVIOXYzaDN6TTcgNUg0djNoM3oiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iIzY5N2I5NCIgZD0iTTEyIDZoLTJ2MWgyek03IDZINXYxaDJ6Ii8+DQogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjciIGQ9Ik0xMiA2aC0xdjFoMXpNNyA2SDZ2MWgxeiIvPg0KICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCINCiAgICAgICAgICAgICAgZD0iTTIgNXYxaDF2MmgxdjFoM1Y4aDJ2MWgzVjhoMVY2aDFWNUg5djFIN1Y1SDJabTUgMXYySDRWNmgzWm0yIDB2MmgzVjZIOVoiIGZpbGw9IiM0YjRiNGIiLz4NCiAgICAgICAgPHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMyIgZD0iTTQgNmgzdjJINHpNOSA2aDN2Mkg5eiIvPg0KICAgICAgICA8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4yIiBkPSJNMiA1aDJ2MUgyek0xMiA1aDJ2MWgtMnoiLz4NCiAgICAgICAgPHBhdGggZD0iTTEwIDExdi0xSDdWOUg2djFoMXYxaDNaIiBmaWxsPSIjZDI5OTg1Ii8+DQogICAgICAgIDxwYXRoIGZpbGw9IiMyODE1MGEiIGQ9Ik03IDFoMnYySDd6Ii8+DQogICAgPC9nPg0KPC9zdmc+DQo=`
;

export const ALL_AVATARS = [AVATAR_1, AVATAR_2, AVATAR_3];
