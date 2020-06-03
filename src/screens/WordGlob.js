import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import '../styles.css';
import * as IMGS from '../common/images';
import {RADIUS_LINE} from '../common/consts'
import * as COLORS from '../common/colors'
//import WordData from '../assets/data/words.json'
//import LatLon1 from '../assets/data/latlon1.json'
import Header from "../components/Header";

/** Redux Begin */
import WordDataActions from '../store/actions/WordData';
import LatitudeActions from '../store/actions/Latitude';
import LongitudeActions from '../store/actions/Longitude';
import AuthActions from '../store/actions/Auth';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
    return {
        wordState: state.word_data,
        latitudeState: state.latitude,
        longitudeState: state.longitude,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        wordDataGet: (lat_min, lat_max, lon_min, lon_max) => dispatch(WordDataActions.WordDataGet(lat_min, lat_max, lon_min, lon_max)),
        latitudeGet: () => dispatch(LatitudeActions.LatitudeGet()),
        longitudeGet: () => dispatch(LongitudeActions.LongitudeGet()),
        logout: () => dispatch(AuthActions.Logout())
    }
}
/** Redux End */

const ReviewDlg = ({ word, onOpenDetailDlg, hoverButton, onMouseEnterItem, onMouseLeaveItem, onClickKnown}) => (
    <div id="reviewdlg" style={{
        width: 465,
        height: 535,
        borderRadius: 30,
        filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
        backgroundColor: "#f2f3f5ef",
        position: "absolute",
        transform: "translate(0px, -50%)",
        top: "50%",
        right: 150,
        zIndex: 10001,
        padding: 30,
    }}>
        <div id={"review-"+word.word} style={{margin:"60px 0px", textAlign:'center', fontFamily:"Helvetica", fontWeight:"bold", fontSize:39}}>
            <span id={"review-prefix"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
            <span id={"review-root"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
            <span id={"review-suffix"+word.word} style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
            <span id={"review-tale"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
        </div>
        <div id={"review-eng"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontWeight:"bold", fontSize:24, padding:20}}>
            <span id={"review-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.english}</span>
        </div>
        <div id={"review-chn"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontWeight:"bold", fontSize:24, padding:20}}>
            <span id={"review-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.chinese}</span>
        </div>
        <button id={"review-known"+word.word} style={{width: 168, height: 81, borderRadius: 31, borderWidth:0, backgroundColor: "#ffffff", position:"absolute", bottom:50, left:50, fontSize:30, color:"#1d1d1c", fontFamily:"Helvetica", fontWeight:300, cursor: hoverButton?'hand':'pointer'}}
            onClick={onClickKnown}
            onMouseEnter={onMouseEnterItem}
            onMouseLeave={onMouseLeaveItem}
        >
            <span id={"review-known-spn"+word.word}>Known</span>
        </button>
        <button id={"review-unknown"+word.word} style={{width: 168, height: 81, borderRadius: 31, borderWidth:0, backgroundColor: "#ffffff", position:"absolute", bottom:50, right:50, fontSize:30, color:"#1d1d1c", fontFamily:"Helvetica", fontWeight:300, cursor: hoverButton?'hand':'pointer'}}
            onClick={onOpenDetailDlg}
            onMouseEnter={onMouseEnterItem}
            onMouseLeave={onMouseLeaveItem}
        >
            <span id={"review-unknown-spn"+word.word}>Unknown</span>
        </button>
    </div>
)

const DetailDlg = ({word, onClickBack, hoverButton, onMouseEnterItem, onMouseLeaveItem}) => (
    <div id={"detail-"+word.word} style={{
        width: 907,
        height: 404,
        borderRadius: 34,
        filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
        backgroundColor: "#f2f3f5",
        position: "absolute",
        transform: "translate(50%, -50%)",
        top: "50%",
        right: "50%",
        zIndex: 10001,
    }}>
        <div id={"detail-"+word.word} style={{marginTop:30, textAlign:'center', fontFamily:"Helvetica", fontWeight:"bold", fontSize:39}}>
            <span id={"detail-prefix"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
            <span id={"detail-root"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
            <span id={"detail-suffix"+word.word} style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
            <span id={"detail-tale"+word.word} style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
        </div>
        <div id={"detail-pron"+word.word} style={{textAlign:'center', fontFamily:"Helvetica", fontWeight:"bold", fontSize:25, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.pronun}</span>
        </div>
        <div id={"detail-eng"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontSize:18, paddingLeft:150, paddingRight:150, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.english}</span>
        </div>
        <div id={"detail-chn"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontSize:18, paddingLeft:150, paddingRight: 150, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.chinese}</span>
        </div>
        <div id={"detail-ex"+word.word} style={{textAlign:'left', fontFamily:"Helvetica", fontSize:18, paddingLeft:150, paddingRight: 150, paddingTop:20}}>
            <span id={"detail-chn-spn"+word.word} style={{color:COLORS.COLOR_DETAIL}}>{word.details.example}</span>
        </div>
        <button id={"detail-btn-back"+word.word} style={{width: 86, background:"#00000000", border:"none", position:"absolute", top:30, left:30, fontSize: 25, color: "#52575a", fontFamily: "Helvetica", fontWeight: 500, cursor: hoverButton?'hand':'pointer'}}
            onClick={onClickBack}
            onMouseEnter={onMouseEnterItem}
            onMouseLeave={onMouseLeaveItem}
        >
            <img src={IMGS.IMG_BACK} style={{width:19, height:24, position:'absolute', top:3, left:0}} alt={"NONE"}></img>
            <span id={"detail-btn-span"} style={{marginLeft:20}}>Back</span>    
        </button>
    </div>
)

class WordGlob extends Component {

    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);
        this.initializeLight = this.initializeLight.bind(this);
        this.drawWordGlobe = this.drawWordGlobe.bind(this);

        this.state = {
            words: null,//WordData.words,
            wordsRnd: null,
            wordsRndLat: null,
            wordsRndLon: null,
            latLabels: null,//LatLon1.lat,
            lonLabels: null,//LatLon1.lon,
            isLoading: true,
            zoomLevel: 1,
            showReviewDlg: false,
            showDetailDlg: false,
            hoverWord: false,
            hoverButton: false,
            selectedWord: null,
            selectedWordIndex: null,
        }
    }

    drawWordGlobe(){
        if(this.frameId){
            cancelAnimationFrame(this.frameId);
            this.mount.removeChild(this.renderer.domElement);
        }
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        this.camera = new THREE.PerspectiveCamera(12, width / height, 1, 20000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.controls.addEventListener("change", (e) => {
            this.setState({})
        })
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.renderer.setSize(width, height);
        
        this.mount.appendChild(this.renderer.domElement);
        
        this.initializeOrbits();
        this.initializeCamera();
        this.initializeLight();

        const geometry = new THREE.SphereGeometry( 100, 40, 40 );
        const texture = new THREE.TextureLoader().load(IMGS.IMG_TEXTURE);
        const material = new THREE.MeshPhongMaterial({ map: texture });
        const sphere = new THREE.Mesh( geometry, material ); 
        this.objects = new THREE.Object3D();
        this.scene.add( this.objects );
        this.objects.add(sphere);
        this.lineMaterialCont = new THREE.LineBasicMaterial( { color : COLORS.COLOR_LATLON, linewidth: 1, linecap: 'round', linejoin:  'round' } );
        this.lineMaterialDash = new THREE.LineDashedMaterial( { color: COLORS.COLOR_LATLON, linewidth: 5, scale: 1, dashSize: 1, gapSize: 1, } );
        this.drawLatLon(this.lineMaterialDash);
        this.animate();
    }

    drawLatLon(lineMaterial, zl){
        if(zl <= 1 || zl > 3) return;
        var latlon = new THREE.Object3D();

        this.lineMaterial = lineMaterial

        var curve = new THREE.EllipseCurve(
        0,  0,
        RADIUS_LINE, RADIUS_LINE,
        0,  2 * Math.PI,
        false,
        0
        );		
        
        var points = curve.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var circle_template = new THREE.Line( geometry, this.lineMaterial );
        circle_template.computeLineDistances();
        var i, circle, radScale;
        if(zl === 2){
            for (i = 0; i < 36; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(0, 1, 0), i * Math.PI / 18);
                latlon.add(circle);
            }
        
            for (i = 0; i < 18; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            
                radScale = Math.cos((i - 9) * Math.PI / 18);
                circle.scale.set(radScale, radScale, radScale);
                circle.translateZ(100 * Math.sin((i - 9) * Math.PI / 18));
                latlon.add(circle);
            }    
        }
        if(zl === 3){
            for (i = 0; i < 72; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(0, 1, 0), i * Math.PI / 36);
                latlon.add(circle);
            }
        
            for (i = 0; i < 36; i ++) {
                circle = circle_template.clone();
                circle.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            
                radScale = Math.cos((i - 18) * Math.PI / 36);
                circle.scale.set(radScale, radScale, radScale);
                circle.translateZ(100 * Math.sin((i - 18) * Math.PI / 36));
                latlon.add(circle);
            }    
        }
        latlon.name = "latlon"
        this.objects.add(latlon)
    }

    zoomIn(){
        console.log(this.state.zoomLevel);
        if(this.state.zoomLevel === 3) return;
        this.intervalZoom = setInterval(()=> {
            this.camera.scale.z += 0.1
            this.objects.remove(this.scene.getObjectByName("latlon"));
            this.drawLatLon(this.lineMaterialDash, this.state.zoomLevel+1);
        }, 30)
        // this.controls.autoRotate=true;
        // this.controls.autoRotateSpeed=0.5;
        this.timeout = setTimeout(()=>{
            //this.controls.autoRotate=false;
            if(this.state.zoomLevel === 1){
                this.camera.scale.z = 4.2;
            }
            if(this.state.zoomLevel === 2){
                this.camera.scale.z = 7.2;
            }
            this.setState({zoomLevel: this.state.zoomLevel+1})
            clearInterval(this.intervalZoom);
        }, 901);
        //this.setState({zoomLevel:2});
    }

    zoomOut(){
        //if(this.camera.scale.z < 3) return;
        console.log(this.state.zoomLevel);
        if(this.state.zoomLevel === 1) return;
        this.intervalZoom = setInterval(()=> {
            this.camera.scale.z -= 0.1
            this.objects.remove(this.scene.getObjectByName("latlon"));
            this.drawLatLon(this.lineMaterialDash, this.state.zoomLevel-1);
        }, 30)
        //this.drawLatLon(this.lineMaterialCont);
        //this.controls.autoRotate=true;
        //this.controls.autoRotateSpeed=0.5;
        this.timeout = setTimeout(()=>{
            //this.controls.autoRotate=false;
            if(this.state.zoomLevel === 3){
                this.camera.scale.z = 4.2;
            }
            if(this.state.zoomLevel === 2){
                this.camera.scale.z = 1.2;
            }
            this.setState({zoomLevel: this.state.zoomLevel-1});
            clearInterval(this.intervalZoom);
        }, 901);
        //this.setState({zoomLevel:1});
    }

    async componentDidMount() {
        this.drawWordGlobe();
        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("mouseup", this.onHideDlg);
        window.addEventListener("mousewheel", this.onPreventZoomPage, { passive: false });
        this.closeHandler = (ev) => 
        {   
            ev.preventDefault();
            console.log("test");
            return ev.returnValue = 'Are you sure you want to close?';
        }
        this.closeEvent = (ev) => {
            ev.preventDefault();
            function sleep(delay) {
                const start = new Date().getTime();
                console.log("unload")
                while (new Date().getTime() < start + delay);
            }
        
            // unloading won't finish until 10 full seconds pass!
            sleep(10000);
            setTimeout(() => {
                // this part would be ignored since unloading will already
                // finish by now, thus it won't wait for this async call
                sleep(10000);
            }, 0);
        }
        //window.addEventListener("beforeunload", this.closeHandler)
        //window.addEventListener("unload", this.closeEvent)
        this.setState({isLoading: true});
        await this.props.latitudeGet();
        await this.props.longitudeGet();
        this.setState({
            latLabels: this.props.latitudeState.latitudes,
            lonLabels: this.props.longitudeState.longitudes,
        })
        await this.props.wordDataGet(
            this.props.latitudeState.latitudes[0].id, 
            this.props.latitudeState.latitudes[35].id+1, 
            this.props.longitudeState.longitudes[0].id, 
            this.props.longitudeState.longitudes[71].id+1
        );
        this.setState({
            words: this.props.wordState.wordData,
            wordsRnd: this.props.wordState.wordDataRnd,
            wordsRndLat: this.props.wordState.wordDataRndLat,
            wordsRndLon: this.props.wordState.wordDataRndLon
        })
        this.setState({isLoading: false})
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
        window.removeEventListener('mouseup', this.onHideDlg);
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener("mousewheel", this.onPreventZoomPage);

        //window.removeEventListener('beforeunload', this.closeHandler);
        //window.removeEventListener('unload', this.closeEvent);
    }

    onWindowResize = () => {
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    
        this.renderer.setSize( width, height );
    }

    onHideDlg = (event) => {
        //console.log(event.target.id);
        if(event.target.id.includes("review")) return;
        this.setState({showReviewDlg:false})
    }

    onPreventZoomPage = (event) => {
        console.log("Mouse wheeling");
        event.preventDefault();
    }
    initializeOrbits() {
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.autoRotate=true;
        this.controls.autoRotateSpeed=0.1;
    }

    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1400;
        this.camera.scale.z = 1.2;
    }

    initializeLight(){
        this.scene.add( new THREE.AmbientLight( 0xeeeeee ) );				

        this.light1 = new THREE.SpotLight( 0x222222, 1.0 );
        this.light1.position.x = 730; 
        this.light1.position.y = 520;
        this.light1.position.z = 626;
        this.light1.castShadow = true;
        this.scene.add( this.light1 );
    
        this.light2 = new THREE.PointLight( 0x222222, 1.0 );
        this.light2.position.x = -640;
        this.light2.position.y = -500;
        this.light2.position.z = -1000;
        this.scene.add( this.light2 );
    }

    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    screenXY(vec3){
        var vector = vec3.clone();
        vector.project(this.camera);
        
        var result = {};
        var width = this.mount.clientWidth;
        var height = this.mount.clientHeight;
        var windowWidth = width;
        var minWidth = 1280;
        
        if(windowWidth < minWidth) {
            windowWidth = minWidth;
        }
    
        result.x = Math.round(vector.x * windowWidth / 2) + windowWidth / 2;
        result.y = Math.round((0 - vector.y) * (height / 2)) + height / 2;
        
        return result;
    }
    
    onMouseEnterItem = () => {
        this.setState({hoverButton: true});
    }

    onMouseLeaveItem = () => {
        this.setState({hoverButton: false});
    }

    onClickKnown = () => {
        this.setState({showReviewDlg:false})
    }

    render() {
        let {wordState, logout} = this.props
        if(wordState.getState === -2){
            logout();
        }
        return (
        <div>
            <Header color="#206ea7" auth={true} history={this.props.history}/>
            <div
                style={{ width: "100vw", height: "100vh" }}
                ref={mount => {
                    this.mount = mount;
                }}
            />
            {this.state.isLoading &&
                <img src={IMGS.IMG_LOADING} style={{width:32, height:32, marginTop:5, position:"absolute", left: "50%", top:"50%"}} alt="Null" />
            }
            {!this.state.isLoading&&
            this.state.words.map((word, index) => {
                var matrix = this.objects.matrixWorld;
                var lat, lon
                if(this.state.zoomLevel === 2){
                    lon = Math.PI * (word.location.lon/2 - 18) / 18;
                    lat = (Math.PI / 2) * (word.location.lat/2 - 9) / 9; // + (Math.PI / 18) * word.location.delta;    
                }else if(this.state.zoomLevel === 3){
                    lon = Math.PI * (word.location.lon - 36) / 36;
                    lat = (Math.PI / 2) * (word.location.lat - 18) / 18;// + (Math.PI / 36) * word.location.delta;    
                }else if(this.state.zoomLevel === 1){
                    lon = Math.PI * (word.location.lon - 18) / 18;
                    lat = (Math.PI / 2) * (word.location.lat - 9) / 9; // + (Math.PI / 18) * word.location.delta;
                }
                var rad = 100;
                
                var phi = lat + Math.PI / 2;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-"+index} key={"word-"+index} 
                        style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                        onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                        onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                        onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-"+index}></div>
                    );
                }
            })
            }
            {!this.state.isLoading&&
            this.state.wordsRnd.map((word, index) =>{
                var matrix = this.objects.matrixWorld;
                var lat, lon
                lon = 2*Math.PI * word.location.lon;
                lat = (Math.PI) * word.location.lat;    
                var rad = 100;
                
                var phi = lat;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-rnd-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-rnd"+index} key={"word-"+index} 
                        style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                        onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                        onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                        onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-rnd"+index}></div>
                    );
                }
            })
            }
            {!this.state.isLoading&&
            this.state.wordsRndLat.map((word, index) => {
                var matrix = this.objects.matrixWorld;
                var lat, lon
                if(this.state.zoomLevel === 2){
                    lon = 2 * Math.PI * word.location.lon/2;
                    lat = (Math.PI / 2) * (word.location.lat/2 - 9) / 9 + (Math.PI / 18) * word.location.delta;
                }else if(this.state.zoomLevel === 3){
                    lon = 2 * Math.PI * word.location.lon/2;
                    lat = (Math.PI / 2) * (word.location.lat - 18) / 18 + (Math.PI / 36) * word.location.delta;
                }else if(this.state.zoomLevel === 1){
                    lon = 2 * Math.PI * word.location.lon/2;
                    lat = (Math.PI / 2) * (word.location.lat - 9) / 9 + (Math.PI / 18) * word.location.delta;
                }
                var rad = 100;
                
                var phi = lat + Math.PI / 2;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-rnd-lat"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                            onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-rnd-lat"+index} key={"word-"+index} 
                        style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                        onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                        onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                        onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-rnd-lat"+index}></div>
                    );
                }
            })
            }
            {!this.state.isLoading&&
            this.state.wordsRndLon.map((word, index) => {
                var matrix = this.objects.matrixWorld;
                var lat, lon
                if(this.state.zoomLevel === 2){
                    lon = Math.PI * (word.location.lon/2 - 18) / 18 +  (Math.PI / 18) * word.location.delta;
                    lat = (Math.PI / 2) * word.location.lat;
                }else if(this.state.zoomLevel === 3){
                    lon = Math.PI * (word.location.lon - 36) / 36 + (Math.PI / 36) * word.location.delta;
                    lat = (Math.PI / 2) * word.location.lat;
                }else if(this.state.zoomLevel === 1){
                    lon = Math.PI * (word.location.lon - 18) / 18 + (Math.PI / 18) * word.location.delta;
                    lat = (Math.PI / 2) * word.location.lat;
                }
                var rad = 100;
                
                var phi = lat + Math.PI / 2;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length()-40;

                if(distance < length && parseInt(word.level) <= this.state.zoomLevel) {
                    if(this.state.selectedWordIndex === index){
                        return(
                        <button id={"word-rnd-lon-"+index} key={"word-"+index} 
                            style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                               onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true})}}
                            onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                            onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <img src={IMGS.IMG_LANDMARK} style={{width:30, height:25, position:"absolute", top: -5, left: -20}} alt="NONE"></img>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                        )  
                    }
                    return(
                        <button id={"word-rnd-lon-"+index} key={"word-"+index} 
                        style={{background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, cursor: this.state.hoverWord?'hand':'pointer', fontFamily:"Helvetica", fontWeight:"bold", fontSize:30}} 
                        onClick={(e) => {console.log(word); this.setState({selectedWord:word, showReviewDlg:true, selectedWordIndex: index})}}
                        onMouseEnter={(e) => {this.setState({hoverWord: true})}}
                        onMouseLeave={(e) => {this.setState({hoverWord: false})}}
                        >
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.prefix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.root}</span>
                            <span style={{color:COLORS.COLOR_SUFFIX}}>{word.config.suffix}</span>
                            <span style={{color:COLORS.COLOR_ROOT}}>{word.config.tale}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"word-rnd-lon-"+index}></div>
                    );
                }
            })
            }
            {!this.state.isLoading &&  
            this.state.latLabels.map((value, index) => {
                var lat;
                if(this.state.zoomLevel === 2){
                    if(index % 2 === 1) return <div key={"lat-empty-"+index}></div>
                    lat = (Math.PI / 2) * (Math.floor(index/2) - 9) / 9;
                }else if(this.state.zoomLevel === 3){
                    lat = (Math.PI / 2) * (index - 18) / 18;
                }
                var matrix = this.objects.matrixWorld;
                var rad = 100;
                var spherical = new THREE.Spherical(rad, 0, 0);
                spherical.setFromVector3(this.camera.position);
                var phi = lat + Math.PI / 2;
                var theta = -spherical.theta+Math.PI/2;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length();

                if(distance < length && this.camera.scale.z > 3) {
                    return(
                        <button id={"lat-"+index} key={"lat-"+index} style={{ background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, display:'flex', flexDirection:'column', transform:"translate(0px, -50%)"}}>
                        <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 15}}>{value.affix}</span>
                        <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 15}}>{value.meaning}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"lat-"+index}></div>
                    );
                }
            })
            }
            {!this.state.isLoading && 
            this.state.lonLabels.map((value, index) => {
                var matrix = this.objects.matrixWorld;
                var lon;
                if(this.state.zoomLevel === 2){
                    if(index % 2 === 1) return <div key={"lon-empty-"+index}></div>
                    lon = Math.PI * (index/2) / 18;
                }else if(this.state.zoomLevel === 3){
                    lon = Math.PI * (index) / 36;
                }
                //var lon = Math.PI * (index) / 18;
                var rad = 100;
                var spherical = new THREE.Spherical(rad, 0, 0);
                spherical.setFromVector3(this.camera.position);
                var phi = -spherical.phi;
                var theta = -lon;
                
                var center = new THREE.Vector3();                
                center.x = Math.sin(phi) * Math.cos(theta) * rad;
                center.y = Math.cos(phi) * rad;
                center.z = Math.sin(phi) * Math.sin(theta) * rad;

                var abspos = center.applyMatrix4(matrix);
                var screenPos = this.screenXY(abspos);
                var distance = this.camera.position.distanceTo(abspos);
                var length = this.camera.position.length();

                if(distance < length && this.camera.scale.z > 3) {
                    return(
                        <button id={"lon-"+index} key={"lon-"+index} style={{ background:"#00000000", border:"none", position:"absolute", top:screenPos.y, left: screenPos.x, display:'flex', flexDirection:'row', transform:"translate(0px, -50%)"}}>
                            <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 15}}>{value.affix}</span>
                            <span style={{fontFamily:"Helvetica", fontWeight:"bold", color:COLORS.COLOR_ROOT, fontSize: 15}}>={value.meaning}</span>
                        </button>
                    )
                }else{
                    return(
                        <div key={"lat-"+index}></div>
                    );
                }
            })
            }
            {!this.state.isLoading &&
                <div className="progress-text">
                    <div className="gre">GRE</div>
                    <div className="smallgre">Your Progress</div>
                    <div className="progress">
                        <div className="bar">
                            <span style={{color: "#2062a7", fontSize: 15, fontFamily:"Helvetica"}}>28%</span>
                        </div>
                    </div>
                </div>
            }

            <div>
                <button type="button" onClick={()=>this.zoomIn()} style={{width: 61, height: 59, backgroundColor: "#f4f4f4", outline:"none", border:"none", borderRadius: 10, position: "absolute", right: 70, top: "50%", marginTop: -80, zIndex: 10000, cursor: this.state.hoverButton?'hand':'pointer'}}
                    onMouseEnter={this.onMouseEnterItem}
                    onMouseLeave={this.onMouseLeaveItem}
                >
                    <img src={IMGS.IMG_ZOOMIN} style={{width: 37, height: 37}} alt="Null"/>
                </button>
                <button type="button" onClick={() => this.zoomOut()} style={{width: 61, height: 59, backgroundColor: "#f4f4f4", outline:"none", border:"none", borderRadius: 10, position: "absolute", right: 70, top: "50%", marginBottom: -10, zIndex: 10000, cursor: this.state.hoverButton?'hand':'pointer'}}
                    onMouseEnter={this.onMouseEnterItem}
                    onMouseLeave={this.onMouseLeaveItem}
                >
                    <img src={IMGS.IMG_ZOOMOUT} style={{width: 37, height: 2, paddingBottom:3}} alt="Null"/>
                </button>
            </div>
            {
            this.state.showDetailDlg &&
                <DetailDlg 
                    word={this.state.selectedWord}
                    onClickBack={() => this.setState({showDetailDlg:false})}
                    onMouseEnterItem={this.onMouseEnterItem}
                    onMouseLeaveItem={this.onMouseLeaveItem}
                    hoverButton={this.state.hoverButton}
                />
            }
            {
            this.state.showReviewDlg &&
                <ReviewDlg 
                    word={this.state.selectedWord} 
                    onClickKnown={this.onClickKnown}
                    onOpenDetailDlg={()=>this.setState({showReviewDlg:false, showDetailDlg:true})}
                    onMouseEnterItem={this.onMouseEnterItem}
                    onMouseLeaveItem={this.onMouseLeaveItem}
                    hoverButton={this.state.hoverButton}
                />
            }
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordGlob);