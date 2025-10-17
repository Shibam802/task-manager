#include <bits/stdc++.h>
using namespace std;

vector<int> solution(vector<int> &S) {
    int n = S.size();
    vector<int> round(n, 0); // stores last round of each player
    int roundNum = 1;
    
    vector<pair<int,int>> players; // {skill, index}
    for (int i = 0; i < n; i++)
        players.push_back({S[i], i});
    
    while (players.size() > 1) {
        vector<pair<int,int>> nextRound;
        for (int i = 0; i + 1 < (int)players.size(); i += 2) {
            auto a = players[i];
            auto b = players[i + 1];
            
            // both players participated in this round
            round[a.second] = roundNum;
            round[b.second] = roundNum;
            
            // winner advances
            if (a.first > b.first)
                nextRound.push_back(a);
            else
                nextRound.push_back(b);
        }
        players = nextRound;
        roundNum++;
    }
    
    // winner's last round is the final round
    round[players[0].second] = roundNum - 1;
    
    return round;
}

int main() {
    vector<int> S = {4, 2, 7, 3, 1, 8, 5, 1};
    vector<int> result = solution(S);
    
    for (int x : result) cout << x << " ";
    cout << endl;
    
    return 0;
}