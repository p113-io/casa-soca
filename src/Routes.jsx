import {Suspense} from 'react';
import loadable from '@loadable/component';
import {
    Routes,
    Route,
  } from "react-router-dom";

///////////////////
// Pages
////////////////

const Home = loadable(() => import('./page/Home'));
const FBX = loadable(() => import('./page/fileLoader/FBX'));
const OBJ = loadable(() => import('./page/fileLoader/OBJ'));
const JsxObject = loadable(() => import('./page/fileLoader/JsxObject'));
const GLTF = loadable(() => import('./page/fileLoader/GLTF'));
const Grass = loadable(() => import('./page/elements/Grass'));
const Terrain = loadable(() => import('./page/elements/Terrain'));
const Scenes = loadable(() => import('./page/Scenes')); 
const Lights = loadable(() => import('./page/elements/Lights'));
const Camera = loadable(() => import('./page/elements/Camera'));
const Fire = loadable(() => import('./page/elements/Fire'));
const ShaderToy = loadable(() => import('./shader/ShaderToy'));
const ShaderLights = loadable(() => import('./page/Lights'));
const ShaderScroll = loadable(() => import('./page/ShaderScroll'));
const Shader = loadable(() => import('./page/Shader'));
const Land = loadable(() => import('./page/Land'));
const Water = loadable(() => import('./page/elements/Water'));
const Rain = loadable(() => import('./page/elements/Rain'));
const Postprocessing = loadable(() => import('./page/elements/Postprocessing'));
const AudioPlayer = loadable(() => import('./audio/AudioPlayer'));
const Catalog = loadable(() => import('./page/Catalog'));
const Category = loadable(() => import('./page/Category'));
const Waves = loadable(() => import('./page/Waves'));
const Perspective = loadable(() => import('./page/Perspective'));
const Sea = loadable(() => import('./page/Sea'));
const Mountains = loadable(() => import('./page/Mountains'));


////////////////
// Routes
////////////////

const MyRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Suspense fallback={null}><Home /></Suspense>} />
          <Route exact path="/fbx" element={<Suspense fallback={null}><FBX /></Suspense>} />
          <Route exact path="/obj" element={<Suspense fallback={null}><OBJ /></Suspense>} />
          <Route exact path="/jsx" element={<Suspense fallback={null}><JsxObject /></Suspense>} />
          <Route exact path="/gltf" element={<Suspense fallback={null}><GLTF /></Suspense>} />
          <Route exact path="/grass" element={<Suspense fallback={null}><Grass /></Suspense>} />
          <Route exact path="/terrain" element={<Suspense fallback={null}><Terrain /></Suspense>} />
          <Route exact path="/scenes" element={<Suspense fallback={null}><Scenes /></Suspense>} />
          <Route exact path="/light" element={<Suspense fallback={null}><Lights /></Suspense>} />
          <Route exact path="/camera" element={<Suspense fallback={null}><Camera /></Suspense>} />
          <Route exact path="/fire" element={<Suspense fallback={null}><Fire /></Suspense>} />
          <Route exact path="/shader" element={<Suspense fallback={null}><ShaderToy /></Suspense>} />
          <Route exact path="/space" element={<Suspense fallback={null}><Shader /></Suspense>} />
          <Route exact path="/water" element={<Suspense fallback={null}><Water /></Suspense>} />
          <Route exact path="/rain" element={<Suspense fallback={null}><Rain /></Suspense>} />
          <Route exact path="/postprocessing" element={<Suspense fallback={null}><Postprocessing /></Suspense>} />
          <Route exact path="/audio" element={<Suspense fallback={null}><AudioPlayer /></Suspense>} />
          <Route exact path="/catalog" element={<Suspense fallback={null}><Catalog /></Suspense>} />
          <Route exact path="/category" element={<Suspense fallback={null}><Category /></Suspense>} />
          <Route exact path="/shader-scroll" element={<Suspense fallback={null}><ShaderScroll /></Suspense>} />
          <Route exact path="/land" element={<Suspense fallback={null}><Land /></Suspense>} />
          <Route exact path="/shader-lights" element={<Suspense fallback={null}><ShaderLights /></Suspense>} />
          <Route exact path="/waves" element={<Suspense fallback={null}><Waves /></Suspense>} />
          <Route exact path="/perspective" element={<Suspense fallback={null}><Perspective /></Suspense>} />
          <Route exact path="/sea" element={<Suspense fallback={null}><Sea /></Suspense>} />
          <Route exact path="/mountains" element={<Suspense fallback={null}><Mountains /></Suspense>} />
        </Routes>
    )
}

export default MyRoutes;