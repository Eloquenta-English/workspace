// OobzoO Mixer Engine
'use strict';
var audioCtx=null,inNode=null,inSrc=0,inStream=null;
var gainNode=null,preampShaper=null,eqNodes=[],compNode=null,faderNode=null,chAnalyser=null;
var preampModels={clean:{c:'#22d3ee',h:[],d:0},neve:{c:'#f97316',h:[0.02,0.015,0.008],d:0.3},api:{c:'#ef4444',h:[0.03,0.02,0.01],d:0.4},ssl:{c:'#34d399',h:[0.01,0.005,0.003],d:0.2},tube:{c:'#fbbf24',h:[0.04,0.03,0.02,0.01],d:0.5},tape:{c:'#a78bfa',h:[0.015,0.01,0.005],d:0.25}};
var curPre='clean';
var compModels={neve:{t:-18,r:4,a:0.01,rl:0.1,k:6},midas:{t:-12,r:3,a:0.003,rl:0.05,k:3},soundcraft:{t:-15,r:6,a:0.001,rl:0.08,k:0},la2a:{t:-20,r:8,a:0.02,rl:0.3,k:12},f1176:{t:-10,r:20,a:0.0005,rl:0.02,k:0}};
var curComp='neve';
var eqBands=[{f:80,g:0,q:1,on:true,l:'80Hz'},{f:240,g:0,q:1,on:true,l:'240Hz'},{f:1000,g:0,q:1.2,on:true,l:'1kHz'},{f:3200,g:0,q:1,on:true,l:'3.2kHz'},{f:8000,g:0,q:1,on:true,l:'8kHz'}];
var fxSends=[
{n:'Delay',ic:'&#x1F30A;',c:'#22d3ee',on:false,lv:0,pan:0,pre:false,p:{time:0.375,fb:0.4,mix:0.3,flt:4000}},
{n:'Reverb',ic:'&#x1F3DB;',c:'#a78bfa',on:false,lv:0,pan:0,pre:false,p:{size:0.6,decay:2.5,mix:0.25,damp:3000}},
{n:'Fuzz',ic:'&#x26A1;',c:'#fbbf24',on:false,lv:0,pan:0,pre:false,p:{drive:0.6,tone:0.5,mix:0.4,sus:0.7}},
{n:'Overdrive',ic:'&#x1F525;',c:'#f97316',on:false,lv:0,pan:0,pre:false,p:{drive:0.5,tone:0.6,mix:0.5,level:0.7}}];
var fxRetNodes=[];
var gainVal=0,faderVal=0.75,mute=false,solo=false;
function init(){createAudio();buildEQ();buildFX();buildMeters();setupGainKnob();setupFader();updInStatus();}
function createAudio(){
if(audioCtx)return;
audioCtx=new(window.AudioContext||window.webkitAudioContext)();
document.getElementById('srdisp').textContent=audioCtx.sampleRate+' Hz';
var master=audioCtx.createGain();master.gain.value=0.8;master.connect(audioCtx.destination);
gainNode=audioCtx.createGain();gainNode.gain.value=1;
preampShaper=audioCtx.createWaveShaper();preampShaper.oversample='4x';updatePreamp();
eqNodes=eqBands.map(function(b){var f=audioCtx.createBiquadFilter();f.type='peaking';f.frequency.value=b.f;f.gain.value=b.g;f.Q.value=b.q;return f;});
compNode=audioCtx.createDynamicsCompressor();compNode.threshold.value=-18;compNode.ratio.value=4;compNode.attack.value=0.01;compNode.release.value=0.1;compNode.knee.value=6;
faderNode=audioCtx.createGain();faderNode.gain.value=faderVal;
chAnalyser=audioCtx.createAnalyser();chAnalyser.fftSize=256;
var chain=[gainNode,preampShaper].concat(eqNodes,[compNode,faderNode,chAnalyser,master]);
for(var i=0;i<chain.length-1;i++)chain[i].connect(chain[i+1]);
createFXRet(master);
requestAnimationFrame(updMeters);}
