<template>
  <div class="ministry-structure-page">
    <div v-if="loading" class="orgchart-full-container w-full h-[70vh] min-h-[400px] flex justify-center items-start">
      <div class="flex flex-col items-center space-y-8">
        <!-- Top level skeleton -->
        <div class="flex space-x-6">
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-18 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <!-- Connection lines -->
        <div class="flex space-x-6">
          <div class="w-32 h-0.5 bg-gray-200"></div>
          <div class="w-32 h-0.5 bg-gray-200"></div>
          <div class="w-32 h-0.5 bg-gray-200"></div>
        </div>
        
        <!-- Second level skeleton -->
        <div class="flex space-x-4">
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-14 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-15 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-13 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <!-- More connection lines -->
        <div class="flex space-x-4">
          <div class="w-28 h-0.5 bg-gray-200"></div>
          <div class="w-28 h-0.5 bg-gray-200"></div>
          <div class="w-28 h-0.5 bg-gray-200"></div>
          <div class="w-28 h-0.5 bg-gray-200"></div>
        </div>
        
        <!-- Third level skeleton -->
        <div class="flex space-x-3">
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-14 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-11 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-13 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="animate-pulse flex items-center bg-white border-2 border-gray-200 rounded-lg shadow px-2 py-1 min-w-[120px] min-h-[40px] gap-2">
            <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            <div class="flex flex-col min-w-0">
              <div class="w-10 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="orgchart-full-container w-full h-[70vh] min-h-[400px] flex justify-center items-start">
        <VueFlow
          v-if="nodes.length > 0"
          :nodes="nodes"
          :edges="edges"
          fit-view
          fit-view-on-init
          :nodes-draggable="false"
          :nodes-connectable="false"
          :elements-selectable="false"
          :min-zoom="0.2"
          :max-zoom="2"
          class="org-flow"
        >
          <template #node-orgNode="{ data }">
            <div @click="openNodeModal(data.raw)" class="flex items-center bg-white border-2 border-blue-300 rounded-lg shadow px-4 py-3 w-[250px] min-h-[70px] gap-4 hover:border-blue-600 hover:shadow-md transition cursor-pointer relative">
              <!-- Connection handles - hidden but functional -->
              <Handle type="target" position="top" class="w-2 h-2 bg-transparent border-0 opacity-0" />
              <Handle type="source" position="bottom" class="w-2 h-2 bg-transparent border-0 opacity-0" />
              <Handle type="source" position="left" class="w-2 h-2 bg-transparent border-0 opacity-0" />
              <Handle type="source" position="right" class="w-2 h-2 bg-transparent border-0 opacity-0" />
              
              <img v-if="data.image" :src="data.image" :alt="data.label" class="w-12 h-12 rounded-full object-cover border border-gray-200 bg-gray-50 flex-shrink-0" />
              <svg v-else class="w-12 h-12 text-gray-400 rounded-full bg-gray-100 border border-gray-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="text-gray-900 text-base font-semibold leading-tight break-words">{{ data.label }}</div>
              </div>
            </div>
          </template>
        </VueFlow>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div class="bg-white border border-gray-200 rounded-xl shadow-xl max-w-2xl w-full p-6 relative flex flex-col">
        <!-- Close button -->
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center rounded-full transition">&times;</button>
        <div class="flex items-center gap-4 mb-3">
          <img v-if="selectedNode?.image" :src="selectedNode.image" :alt="selectedNode?.name?.[locale] || selectedNode?.name?.ka || selectedNode?.name?.en || selectedNode?.label" class="w-14 h-14 rounded-full object-cover border border-gray-200 bg-gray-50" />
          <svg v-else class="w-14 h-14 text-gray-300 rounded-full bg-gray-100 border border-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div class="flex flex-col min-w-0">
            <div class="text-gray-900 text-base font-bold leading-tight truncate">
              {{ selectedNode?.name?.[locale] || selectedNode?.name?.ka || selectedNode?.name?.en || selectedNode?.label }}
            </div>
            <div v-if="selectedNode?.position?.[locale] || selectedNode?.position?.ka || selectedNode?.position?.en" class="text-gray-500 text-xs leading-tight truncate mt-0.5">
              {{ selectedNode?.position?.[locale] || selectedNode?.position?.ka || selectedNode?.position?.en }}
            </div>
          </div>
        </div>
        <!-- Info List: show all fields except id, children, image, label, position -->
        <div class="space-y-1 text-sm">
          <div v-if="selectedNode?.description?.[locale] || selectedNode?.description?.ka || selectedNode?.description?.en" class="text-gray-700 max-h-48 overflow-y-auto pr-2" v-html="selectedNode?.description?.[locale] || selectedNode?.description?.ka || selectedNode?.description?.en">
          </div>
          <div v-if="selectedNode?.address?.[locale] || selectedNode?.address?.ka || selectedNode?.address?.en" class="text-gray-600">
            <span class="font-medium">{{ locale === 'ka' ? 'მისამართი' : 'Address' }}:</span> <span v-html="selectedNode?.address?.[locale] || selectedNode?.address?.ka || selectedNode?.address?.en"></span>
          </div>
          <div v-if="selectedNode?.email" class="text-gray-600">
            <span class="font-medium">{{ locale === 'ka' ? 'ელფოსტა' : 'Email' }}:</span> {{ selectedNode.email }}
          </div>
          <div v-if="selectedNode?.phone" class="text-gray-600">
            <span class="font-medium">{{ locale === 'ka' ? 'ტელეფონი' : 'Phone' }}:</span> {{ selectedNode.phone }}
          </div>
          <!-- Social Icons Row -->
          <div class="flex flex-wrap gap-2 mt-1">
            <a v-if="selectedNode?.facebook_url" :href="selectedNode.facebook_url" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 transition-colors" title="Facebook">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a v-if="selectedNode?.twitter_url" :href="selectedNode.twitter_url" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-600 transition-colors" title="Twitter">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a v-if="selectedNode?.instagram_url" :href="selectedNode.instagram_url" target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:text-pink-800 transition-colors" title="Instagram">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.163-1.297-.49-.422-.327-.49-.807-.49-1.297s.068-.97.49-1.297c.422-.327.807-.49 1.297-.49s.875.163 1.297.49c.422.327.49.807.49 1.297s-.068.97-.49 1.297c-.422.327-.807.49-1.297.49z"/>
              </svg>
            </a>
            <a v-if="selectedNode?.youtube_url" :href="selectedNode.youtube_url" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-800 transition-colors" title="YouTube">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a v-if="selectedNode?.linkedin_url" :href="selectedNode.linkedin_url" target="_blank" rel="noopener noreferrer" class="text-blue-700 hover:text-blue-900 transition-colors" title="LinkedIn">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <a v-if="selectedNode?.telegram_url" :href="selectedNode.telegram_url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 transition-colors" title="Telegram">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from '@/utils/axios';
import { VueFlow, Handle } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';

const { locale } = useI18n();

const structure = ref(null);
const loading = ref(true);
const error = ref('');
const nodes = ref([]);
const edges = ref([]);

// Modal state
const showModal = ref(false);
const selectedNode = ref(null);

function openNodeModal(node) {
  selectedNode.value = node;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
  selectedNode.value = null;
}

// --- Symmetric tree layout for Vue Flow ---
// First, count leaves to determine x positions
function countLeaves(node) {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}

// Calculate optimal spacing based on node count and available width
function calculateOptimalSpacing(nodes, containerWidth = 1200) {
  const nodeWidth = 180; // Much larger node width (250px content + 30px padding)
  const minSpacing = nodeWidth + 100; // Minimum spacing = node width + 100px buffer
  const maxNodesInRow = Math.max(...nodes.map(node => countLeaves(node)));
  
  // Calculate automatic spacing based on available width and node count
  if (maxNodesInRow <= 1) {
    return 500; // Single node - use generous spacing
  }
  
  // Calculate spacing that ensures nodes never overlap
  const totalNodeWidth = maxNodesInRow * nodeWidth;
  const availableSpacing = containerWidth - totalNodeWidth;
  const calculatedSpacing = availableSpacing / (maxNodesInRow + 1);
  
  // Always use spacing that's at least node width + buffer
  const spacing = Math.max(minSpacing, calculatedSpacing);
  
  // Cap the maximum spacing to prevent excessive gaps
  const maxSpacing = 800;
  return Math.min(spacing, maxSpacing);
}

// Assign positions recursively, centering parents above their children
function assignPositions(node, depth, xStart, xStep, arrNodes, arrEdges, parentId = null) {
  const leaves = countLeaves(node);
  let x = xStart + (leaves * xStep) / 2 - xStep / 2;
  const nodeId = String(node.id);
  arrNodes.push({
    id: nodeId,
    type: 'orgNode',
    data: {
      label: node.name?.[locale.value] || node.name?.ka || node.name?.en || node.label || '',
      position: node.position?.[locale.value] || node.position?.ka || node.position?.en || '',
      image: node.image || '',
      raw: node, // Store the full API node object
    },
    position: { x, y: depth * 180 }, // Much larger vertical spacing
  });
  if (parentId) {
    // Create edge with better handle positioning to prevent crossings
    arrEdges.push({ 
      id: `${parentId}->${nodeId}`, 
      source: parentId, 
      target: nodeId, 
      type: 'smoothstep',
      sourceHandle: 'bottom', // Parent node connects from bottom
      targetHandle: 'top',    // Child node connects to top
      style: { stroke: '#94a3b8', strokeWidth: 2 }, // Better edge styling
      animated: false,
      markerEnd: { type: 'arrowclosed', width: 20, height: 20, color: '#94a3b8' }
    });
  }
  if (Array.isArray(node.children) && node.children.length > 0) {
    // Sort children by sort_order first, then by name as fallback
    const sortedChildren = [...node.children].sort((a, b) => {
      // First sort by sort_order
      if (a.sort_order !== b.sort_order) {
        return (a.sort_order || 0) - (b.sort_order || 0);
      }
      // If sort_order is the same, sort alphabetically by Georgian name
      const aLabel = a.name?.ka || a.label || '';
      const bLabel = b.name?.ka || b.label || '';
      return aLabel.localeCompare(bLabel, 'ka');
    });
    let childX = xStart;
    for (const child of sortedChildren) {
      const childLeaves = countLeaves(child);
      assignPositions(child, depth + 1, childX, xStep, arrNodes, arrEdges, nodeId);
      childX += childLeaves * xStep;
    }
  }
}

// Update layout when window is resized
function updateLayout() {
  if (!structure.value) return;
  
  const containerWidth = Math.min(window.innerWidth * 0.7, 1200); // Much more conservative width
  const xStep = calculateOptimalSpacing(Array.isArray(structure.value) ? structure.value : [structure.value], containerWidth);
  
  let arrNodes = [], arrEdges = [];
  
  if (Array.isArray(structure.value)) {
    // Sort root level items by sort_order first, then by name
    const sortedStructure = [...structure.value].sort((a, b) => {
      // First sort by sort_order
      if (a.sort_order !== b.sort_order) {
        return (a.sort_order || 0) - (b.sort_order || 0);
      }
      // If sort_order is the same, sort alphabetically by Georgian name
      const aLabel = a.name?.ka || a.label || '';
      const bLabel = b.name?.ka || b.label || '';
      return aLabel.localeCompare(bLabel, 'ka');
    });
    
    let xStart = 0;
    for (const item of sortedStructure) {
      const leaves = countLeaves(item);
      assignPositions(item, 0, xStart, xStep, arrNodes, arrEdges, null);
      xStart += leaves * xStep;
    }
  } else {
    assignPositions(structure.value, 0, 0, xStep, arrNodes, arrEdges, null);
  }
  
  nodes.value = arrNodes;
  edges.value = arrEdges;
}

async function fetchStructure() {
  loading.value = true;
  error.value = '';
  try {
    const res = await axios.get('/ministry-structures');
    const data = res.data.data || res.data;
    structure.value = data;
    let arrNodes = [], arrEdges = [];
    
    // Calculate optimal spacing based on data structure
    const containerWidth = Math.min(window.innerWidth * 0.7, 1200); // Much more conservative width, max 1200px
    const xStep = calculateOptimalSpacing(Array.isArray(data) ? data : [data], containerWidth);
    
    if (Array.isArray(data)) {
      // Multiple roots: sort by sort_order first, then by name
      const sortedData = [...data].sort((a, b) => {
        // First sort by sort_order
        if (a.sort_order !== b.sort_order) {
          return (a.sort_order || 0) - (b.sort_order || 0);
        }
        // If sort_order is the same, sort alphabetically by Georgian name
        const aLabel = a.name?.ka || a.label || '';
        const bLabel = b.name?.ka || b.label || '';
        return aLabel.localeCompare(bLabel, 'ka');
      });
      
      let xStart = 0;
      for (const [idx, item] of sortedData.entries()) {
        const leaves = countLeaves(item);
        assignPositions(item, 0, xStart, xStep, arrNodes, arrEdges, null);
        xStart += leaves * xStep;
      }
    } else {
      // Single root
      assignPositions(data, 0, 0, xStep, arrNodes, arrEdges, null);
    }
    nodes.value = arrNodes;
    edges.value = arrEdges;
    console.log('Vue Flow nodes:', arrNodes);
    console.log('Vue Flow edges:', arrEdges);
  } catch (e) {
    error.value = e?.response?.data?.message || e.message || 'Error loading structure';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchStructure();
  // Add resize listener for responsive layout
  window.addEventListener('resize', updateLayout);
});

onUnmounted(() => {
  // Clean up resize listener
  window.removeEventListener('resize', updateLayout);
});

// Watch for locale changes and update node labels
watch(locale, () => {
  if (structure.value) {
    updateLayout();
  }
});
</script>
