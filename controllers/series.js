const labels = [
  { id: 'to-watch', name: 'Vou Assistir' },
  { id: 'watching', name: 'Estou Assistindo' },
  { id: 'watched', name: 'Ja Assisti' }
]

const index = async ({ Serie }, req, res) => {
  const docs = await Serie.find({})
  res.render('series/index', { series: docs, labels })
}

const novaProcess = async ({ Serie }, req, res) => {
  const serie = new Serie(req.body)
  await serie.save()
  res.redirect('/series')
}

const novaForm = (req, res) => {
  res.render('series/nova')
}

const excluir = async ({ Serie }, req, res) => {
  await Serie.deleteOne({ _id: req.params.id })
  res.redirect('/series')
}

const editarProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  serie.name = req.body.name
  serie.status = req.body.status
  await serie.save()
  res.redirect('/series')
}

const editarForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/editar', { serie, labels })
}

const info = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/info', { serie })
}

const addComment = async ({ Serie }, req, res) => {
  await Serie.updateOne({ _id: req.params.id }, { $push: { comments: req.body.comentario } })
  res.redirect('/series/info/' + req.params.id)
}

module.exports = {
  index, novaProcess, novaForm, excluir, editarForm, editarProcess, info, addComment
}