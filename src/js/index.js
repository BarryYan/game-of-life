(function(){
    const GRID_W = 10
    const GRID_ROW = 90
    const GRID_COL = 165
    
    let ctx = null
    window.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = GRID_W * GRID_COL
        canvas.height = GRID_W * GRID_ROW
        document.getElementById('app').append(canvas)

        ctx = canvas.getContext('2d')
        game()
    }
    
    let grids = generateGrid()
    let oldGrids = generateGrid()

    function game(){
        walker(initGrid)
        walker(render)
        const timer = setInterval(() => {
            oldGrids = grids
            grids = generateGrid()
            walker(liveOrDie)
            walker(render)
        }, 100)
    }

    function generateGrid(){
        return [
            ...new Array(GRID_ROW).fill(1).map(i => new Array(GRID_COL).fill(1))
        ]
    }

    function walker(fn){
        for(let i = 0; i < GRID_ROW; i++){
            for(let j = 0; j < GRID_COL; j++){
                fn(i, j)
            }
        }
    }

    function initGrid(row, col){
        grids[row][col] = Math.random() > 0.5 ? 1 : 0
    }

    function render(row, col){
        drawGrid(col * GRID_W, row * GRID_W, grids[row][col] ? 'red' : '#ccc')
    }

    function liveOrDie(row, col){
        grids[row][col] = oldGrids[row][col]
        const neighbors = []
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(i === 0 && j === 0) continue;   
                if(oldGrids[row + i]){
                    neighbors.push(+Boolean(oldGrids[row + i][col + j]))
                }
            }
        }
        const lives = neighbors.reduce((acc, curr) => acc + curr, 0)
        if(oldGrids[row][col]){
            if(lives > 3 || lives < 2){
                grids[row][col] = 0
            }
        }else{
            if(lives === 3){
                grids[row][col] = 1
            }
        }
    }

    function drawGrid(x, y, color = '#ccc'){
        ctx.fillStyle = color
        ctx.fillRect(x, y, GRID_W - 1, GRID_W - 1)
    }
    
})()